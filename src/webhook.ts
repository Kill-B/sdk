import { ApiRequest } from './apiRequest';
import { createHash } from 'crypto';
import { IncomingHttpHeaders } from 'http';
import { components } from './types';

export class Webhook extends ApiRequest {

  public async create(body: components['schemas']['CreateWebhookDto']): Promise<components['schemas']['CreateWebhookResponseDto']> {
    await this.authenticateCheck();
    const response = await this.api.post<components['schemas']['CreateWebhookResponseDto']>('/webhooks', body);
    return response.data;
  }

  public async update(body: components['schemas']['UpdateWebhookDto']): Promise<components['schemas']['UpdateWebhookResponseDto']> {
    await this.authenticateCheck();
    const response = await this.api.patch(`/webhooks`, body);
    return response.data;
  }

  public async delete(): Promise<void> {
    await this.authenticateCheck();
    const response = await this.api.delete(`/webhooks`);
    return response.data;
  }

  public async get(): Promise<components['schemas']['GetWebhookResponseDto']> {
    await this.authenticateCheck();
    const response = await this.api.get(`/webhooks`);
    return response.data;
  }

  public validateEvent(body: any, headers: IncomingHttpHeaders): boolean {
    const hash = createHash('sha256')
      .update(`${JSON.stringify(body)}_${this.config.credentials.webhookSecret}`)
      .digest('hex');
    const hashSignature = headers['x-signature-sha256'];
    return hash === hashSignature;
  }
}
