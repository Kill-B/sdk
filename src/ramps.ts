import { ApiRequest } from './apiRequest';
import { RampsInput, RampsResponse, RampsQueryParams, RampsQueryResponse } from './types';

export class Ramps extends ApiRequest {

  public async create(body: RampsInput): Promise<RampsResponse> {
    await this.authenticateCheck();
    const response = await this.api.post<RampsResponse>('/ramps', body);
    return response.data;
  }

  public async list(query?: RampsQueryParams): Promise<RampsQueryResponse> {
    await this.authenticateCheck();
    const queryParams = '?' + new URLSearchParams(query as any || {}).toString();
    const response = await this.api.get<RampsQueryResponse>(`/ramps${queryParams}`);
    return response.data;
  }
}
