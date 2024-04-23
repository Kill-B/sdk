import { ApiRequest } from './apiRequest';
import { components, paths } from './types';

export class Ramps extends ApiRequest {

  public async create(body: components['schemas']['CreateRampInputDto']): Promise<components['schemas']['CreateRampResponseDto']> {
    await this.authenticateCheck();
    const response = await this.api.post<components['schemas']['CreateRampResponseDto']>('/ramps', body);
    return response.data;
  }

  public async list(query?: paths["/ramps"]["get"]['parameters']['query']): Promise<components['schemas']['GetRampQueryResponseDto']> {
    await this.authenticateCheck();
    const queryParams = '?' + new URLSearchParams(query as any || {}).toString();
    const response = await this.api.get<components['schemas']['GetRampQueryResponseDto']>(`/ramps${queryParams}`);
    return response.data;
  }
}
