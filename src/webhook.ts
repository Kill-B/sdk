import { createHash, createHmac, timingSafeEqual } from 'crypto';
import { IncomingHttpHeaders } from 'http';

import { ApiRequest } from './apiRequest';
import { components } from './types';

/**
 * The Webhook class provides methods for managing webhooks.
 *
 * It extends the ApiRequest class, inheriting its methods and properties.
 * It provides methods to create, update, delete, get, and validate webhooks.
 */
export class Webhook extends ApiRequest {
  /**
   * Creates a new webhook.
   *
   * This method sends a POST request to the '/webhooks' endpoint with the provided body.
   * The body should conform to the 'CreateWebhookDto' schema.
   *
   * @param body - The data for the new webhook. Should conform to the 'CreateWebhookDto' schema.
   * @returns A promise that resolves to the created webhook data, conforming to the 'CreateWebhookResponseDto' schema.
   */
  public async create(
    body: components['schemas']['CreateWebhookDto'],
  ): Promise<components['schemas']['CreateWebhookResponseDto']> {
    await this.authenticateCheck();
    const response = await this.api.post<components['schemas']['CreateWebhookResponseDto']>('api/v2/webhooks', body);
    return response.data;
  }

  /**
   * Updates an existing webhook.
   *
   * This method sends a PATCH request to the '/webhooks' endpoint with the provided body.
   * The body should conform to the 'UpdateWebhookDto' schema.
   *
   * @param body - The data for the webhook update. Should conform to the 'UpdateWebhookDto' schema.
   * @returns A promise that resolves to the updated webhook data, conforming to the 'UpdateWebhookResponseDto' schema.
   */
  public async update(
    body: components['schemas']['UpdateWebhookDto'],
  ): Promise<components['schemas']['UpdateWebhookResponseDto']> {
    await this.authenticateCheck();
    const response = await this.api.patch(`api/v2/webhooks`, body);
    return response.data;
  }

  /**
   * Deletes a webhook.
   *
   * This method sends a DELETE request to the '/webhooks' endpoint.
   *
   * @returns A promise that resolves when the webhook is deleted.
   */
  public async delete(): Promise<void> {
    await this.authenticateCheck();
    const response = await this.api.delete(`api/v2/webhooks`);
    return response.data;
  }

  /**
   * Retrieves a webhook.
   *
   * This method sends a GET request to the '/webhooks' endpoint.
   *
   * @returns A promise that resolves to the webhook data, conforming to the 'GetWebhookResponseDto' schema.
   */
  public async get(): Promise<components['schemas']['GetWebhookResponseDto']> {
    await this.authenticateCheck();
    const response = await this.api.get(`api/v2/webhooks`);
    return response.data;
  }

  /**
   * Validates a webhook event with the legacy `x-signature-sha256` header.
   *
   * The signature is the SHA-256 of the JSON body followed by `_` and the webhook secret.
   *
   * @deprecated Use {@link Webhook.verifySignature}, which checks the HMAC `X-KillB-Signature`
   * header against the raw body and rejects replayed requests.
   *
   * @param body - The body of the webhook event.
   * @param headers - The headers of the webhook event.
   * @returns A boolean indicating whether the event is valid.
   */
  public validateEvent(body: any, headers: IncomingHttpHeaders): boolean {
    const hash = createHash('sha256')
      .update(`${JSON.stringify(body)}_${this.config.credentials.webhookSecret}`)
      .digest('hex');
    return safeEqual(hash, headerValue(headers, 'x-signature-sha256'));
  }

  /**
   * Verifies the `X-KillB-Signature` header of a webhook request.
   *
   * The header is `t=<unix seconds>,v1=<signature>`, where the signature is the lowercase hex
   * HMAC-SHA256 of `t + "." + rawBody` keyed with the webhook secret
   * (`config.credentials.webhookSecret`).
   *
   * Pass the body exactly as received (for example with `express.raw({ type: 'application/json' })`),
   * not a parsed and re-serialized object.
   *
   * @param rawBody - The raw request body, as a string or Buffer.
   * @param headers - The request headers.
   * @param options.toleranceSeconds - Maximum age of the signature timestamp, in either direction. Default 300.
   * @param options.now - Current time in milliseconds, for tests. Default `Date.now()`.
   * @returns `true` when a `v1` signature matches and the timestamp is within the tolerance.
   * @throws Error when no webhook secret is configured.
   */
  public verifySignature(
    rawBody: string | Buffer,
    headers: IncomingHttpHeaders,
    options: { toleranceSeconds?: number; now?: number } = {},
  ): boolean {
    const secret = this.config.credentials.webhookSecret;
    if (!secret) throw new Error('credentials.webhookSecret is required to verify webhook signatures');

    const header = headerValue(headers, 'x-killb-signature');
    if (!header) return false;

    const parts = header.split(',').map(part => {
      const index = part.indexOf('=');
      return index === -1 ? ['', ''] : [part.slice(0, index).trim(), part.slice(index + 1).trim()];
    });
    const timestamps = parts.filter(([key]) => key === 't').map(([, value]) => value);
    const signatures = parts.filter(([key]) => key === 'v1').map(([, value]) => value);
    if (timestamps.length !== 1 || signatures.length === 0) return false;

    const timestamp = timestamps[0] as string;
    if (!/^\d+$/.test(timestamp)) return false;
    const toleranceSeconds = options.toleranceSeconds ?? DEFAULT_TOLERANCE_SECONDS;
    const nowSeconds = (options.now ?? Date.now()) / 1000;
    if (Math.abs(nowSeconds - Number(timestamp)) > toleranceSeconds) return false;

    const expected = createHmac('sha256', secret).update(`${timestamp}.`).update(rawBody).digest('hex');
    return signatures.some(signature => safeEqual(expected, signature));
  }
}

const DEFAULT_TOLERANCE_SECONDS = 300;

const headerValue = (headers: IncomingHttpHeaders, name: string): string | undefined => {
  const value = headers[name];
  return typeof value === 'string' ? value : undefined;
};

const safeEqual = (expected: string, received: string | undefined): boolean => {
  if (received === undefined) return false;
  const a = Buffer.from(expected);
  const b = Buffer.from(received);
  return a.length === b.length && timingSafeEqual(a, b);
};
