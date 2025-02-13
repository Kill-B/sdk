import { ApiRequest } from './apiRequest';
import { createHash } from 'crypto';
import { IncomingHttpHeaders } from 'http';
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
  public async create(body: components['schemas']['CreateWebhookDto']): Promise<components['schemas']['CreateWebhookResponseDto']> {
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
  public async update(body: components['schemas']['UpdateWebhookDto']): Promise<components['schemas']['UpdateWebhookResponseDto']> {
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
   * Validates a webhook event.
   *
   * This method checks if the provided body and headers match the expected signature.
   * The signature is calculated using the webhook secret and the body of the event.
   *
   * @param body - The body of the webhook event.
   * @param headers - The headers of the webhook event.
   * @returns A boolean indicating whether the event is valid.
   */
  public validateEvent(body: any, headers: IncomingHttpHeaders): boolean {
    const hash = createHash('sha256')
      .update(`${JSON.stringify(body)}_${this.config.credentials.webhookSecret}`)
      .digest('hex');
    const hashSignature = headers['x-signature-sha256'];
    return hash === hashSignature;
  }
}
