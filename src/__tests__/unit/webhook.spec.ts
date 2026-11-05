import { createHash, createHmac } from 'crypto';

import { Webhook } from '../../webhook';

const secret = 'test-webhook-secret';
const config = {
  testEnv: true,
  credentials: { email: 'test@test.com', password: 'test-password', webhookSecret: secret },
};

const event = {
  id: 'evt-1',
  data: { id: 'ramp-1', status: 'COMPLETED', note: 'café' },
  event: 'RAMP',
  action: 'UPDATE',
  updatedAt: '2026-11-04T12:00:00.000Z',
  createdAt: '2026-11-04T12:00:00.000Z',
  attempts: 1,
};

const sign = (rawBody: string, timestamp: number, key = secret) => ({
  'x-signature-sha256': createHash('sha256').update(`${rawBody}_${key}`).digest('hex'),
  'x-killb-signature': `t=${timestamp},v1=${createHmac('sha256', key).update(`${timestamp}.${rawBody}`).digest('hex')}`,
});

describe('Webhook', () => {
  const nowSeconds = 1_793_000_000;
  const now = nowSeconds * 1000;
  const rawBody = JSON.stringify(event);
  let webhook: Webhook;

  beforeEach(() => {
    webhook = new Webhook(config);
  });

  describe('verifySignature', () => {
    it('accepts a request signed as KillB signs it, with the body as a string', () => {
      expect(webhook.verifySignature(rawBody, sign(rawBody, nowSeconds), { now })).toBe(true);
    });

    it('accepts the raw body as a Buffer', () => {
      expect(webhook.verifySignature(Buffer.from(rawBody), sign(rawBody, nowSeconds), { now })).toBe(true);
    });

    it('rejects a tampered body', () => {
      const tampered = rawBody.replace('COMPLETED', 'FAILED');
      expect(webhook.verifySignature(tampered, sign(rawBody, nowSeconds), { now })).toBe(false);
    });

    it('rejects a signature made with another secret', () => {
      expect(webhook.verifySignature(rawBody, sign(rawBody, nowSeconds, 'other-secret'), { now })).toBe(false);
    });

    it('rejects a timestamp older than the tolerance', () => {
      expect(webhook.verifySignature(rawBody, sign(rawBody, nowSeconds - 301), { now })).toBe(false);
    });

    it('rejects a timestamp further in the future than the tolerance', () => {
      expect(webhook.verifySignature(rawBody, sign(rawBody, nowSeconds + 301), { now })).toBe(false);
    });

    it('accepts a timestamp at the edge of the tolerance', () => {
      expect(webhook.verifySignature(rawBody, sign(rawBody, nowSeconds - 300), { now })).toBe(true);
    });

    it('honours a custom tolerance', () => {
      const headers = sign(rawBody, nowSeconds - 60);
      expect(webhook.verifySignature(rawBody, headers, { now, toleranceSeconds: 30 })).toBe(false);
      expect(webhook.verifySignature(rawBody, headers, { now, toleranceSeconds: 120 })).toBe(true);
    });

    it('rejects a request without the header', () => {
      const { 'x-killb-signature': _, ...legacyOnly } = sign(rawBody, nowSeconds);
      expect(webhook.verifySignature(rawBody, legacyOnly, { now })).toBe(false);
    });

    it.each([
      ['no timestamp', 'v1=abc'],
      ['no signature', `t=${nowSeconds}`],
      ['non-numeric timestamp', 't=abc,v1=abc'],
      ['two timestamps', `t=${nowSeconds},t=${nowSeconds},v1=abc`],
      ['garbage', 'not-a-signature'],
    ])('rejects a malformed header (%s)', (_, header) => {
      expect(webhook.verifySignature(rawBody, { 'x-killb-signature': header }, { now })).toBe(false);
    });

    it('rejects a header sent more than once', () => {
      const header = sign(rawBody, nowSeconds)['x-killb-signature'];
      expect(webhook.verifySignature(rawBody, { 'x-killb-signature': [header, header] } as any, { now })).toBe(false);
    });

    it('accepts any matching v1 when several are present', () => {
      const header = sign(rawBody, nowSeconds)['x-killb-signature'];
      const withExtra = header.replace('v1=', 'v1=0000,v1=');
      expect(webhook.verifySignature(rawBody, { 'x-killb-signature': withExtra }, { now })).toBe(true);
    });

    it('throws when no webhook secret is configured', () => {
      const withoutSecret = new Webhook({ testEnv: true, credentials: { email: 'a@test.com', password: 'p' } });
      expect(() => withoutSecret.verifySignature(rawBody, sign(rawBody, nowSeconds), { now })).toThrow(
        'credentials.webhookSecret is required',
      );
    });

    it('uses the current time by default', () => {
      const current = Math.floor(Date.now() / 1000);
      expect(webhook.verifySignature(rawBody, sign(rawBody, current))).toBe(true);
    });
  });

  describe('validateEvent (legacy header)', () => {
    it('still accepts the legacy x-signature-sha256 header', () => {
      expect(webhook.validateEvent(event, sign(rawBody, nowSeconds))).toBe(true);
    });

    it('rejects a wrong legacy signature', () => {
      expect(webhook.validateEvent(event, { 'x-signature-sha256': 'f'.repeat(64) })).toBe(false);
    });

    it('rejects a missing legacy header', () => {
      expect(webhook.validateEvent(event, {})).toBe(false);
    });
  });
});
