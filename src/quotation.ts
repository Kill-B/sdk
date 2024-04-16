import { ApiRequest } from './apiRequest';
import { QuotationInput, QuotationResponse } from './types';

export class Quotation extends ApiRequest {

  public async create(body: QuotationInput): Promise<QuotationResponse> {
    await this.authenticateCheck();
    const response = await this.api.post<QuotationResponse>('/quotations', body);
    return response.data;
  }
}
