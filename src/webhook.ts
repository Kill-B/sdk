import { ApiRequest } from './apiRequest';
import { WebhookInput, WebhookResponse } from './types';

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
}
