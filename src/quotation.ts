import { ApiRequest } from './apiRequest';
import { components } from './types';

export class Quotation extends ApiRequest {

  public async create(body: components['schemas']['CreateQuotationDto']): Promise<components['schemas']['CreateQuotationResponseDto']> {
    await this.authenticateCheck();
    const response = await this.api.post<components['schemas']['CreateQuotationResponseDto']>('/quotations', body);
    return response.data;
  }
}
