import { ApiRequest } from './apiRequest';
import { WebhookInput, WebhookResponse } from './types';
import { createHash } from 'crypto';
import { IncomingHttpHeaders } from 'http';

export class Webhook extends ApiRequest {

  public async create(body: WebhookInput): Promise<WebhookResponse> {
    await this.authenticateCheck();
    const response = await this.api.post<WebhookResponse>('/webhooks', body);
    return response.data;
  }

  public async update(body: WebhookInput): Promise<WebhookResponse> {
    await this.authenticateCheck();
    const response = await this.api.patch(`/webhooks`, body);
    return response.data;
  }

  public async delete(): Promise<void> {
    await this.authenticateCheck();
    const response = await this.api.delete(`/webhooks`);
    return response.data;
  }

  public async get(): Promise<WebhookResponse> {
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
