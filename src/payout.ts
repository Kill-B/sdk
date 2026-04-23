import { ApiRequest } from './apiRequest';
import { paths } from './types';
import { CreatePayoutInput, CreatePayoutResponse, GetPayoutQueryResponse } from './types';

export class Payout extends ApiRequest {
  public async list(query?: paths["/api/v2/payouts"]["get"]["parameters"]["query"]): Promise<GetPayoutQueryResponse> {
    await this.authenticateCheck();
    const queryParams = '?' + new URLSearchParams(query as Record<string, any> || {}).toString();
    const response = await this.api.get<GetPayoutQueryResponse>(`api/v2/payouts${queryParams}`);
    return response.data;
  }

  public async create(body: CreatePayoutInput): Promise<CreatePayoutResponse> {
    await this.authenticateCheck();
    const response = await this.api.post<CreatePayoutResponse>('api/v2/payouts', body);
    return response.data;
  }

  public async getById(id: string): Promise<CreatePayoutResponse> {
    await this.authenticateCheck();
    const response = await this.api.get<CreatePayoutResponse>(`api/v2/payouts/${id}`);
    return response.data;
  }
}
