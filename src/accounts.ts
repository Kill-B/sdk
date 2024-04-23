import { ApiRequest } from './apiRequest';
import { components } from './types';

export class Accounts extends ApiRequest {

  public async create(body: components['schemas']['CreateAccountDto']): Promise<components['schemas']['CreateAccountResponseDto']> {
    await this.authenticateCheck();
    const response = await this.api.post('/accounts', body);
    return response.data;
  }

  public async update(id: string, body: components['schemas']['UpdateAccountResponseDto']): Promise<components['schemas']['CreateAccountResponseDto']> {
    await this.authenticateCheck();
    const response = await this.api.patch(`/accounts/${id}`, body);
    return response.data;
  }

  public async getById(id: string): Promise<components['schemas']['CreateAccountResponseDto']> {
    await this.authenticateCheck();
    const response = await this.api.get(`/accounts/${id}`);
    return response.data;
  }

  public async getByUserId(userId: string): Promise<components['schemas']['CreateAccountResponseDto'][]> {
    await this.authenticateCheck();
    const response = await this.api.get(`/accounts/userId/${userId}`);
    return response.data;
  }

  public async getBanksByCountry(countryCode: string): Promise<components['schemas']['GetBanksResponseDto'][]> {
    await this.authenticateCheck();
    const response = await this.api.get(`/banks?countryCode=${countryCode}`);
    return response.data;
  }

  public async getBankByCountry(countryCode: string, code: string): Promise<components['schemas']['GetBanksResponseDto'] | undefined> {
    await this.authenticateCheck();
    const response = await this.api.get<components['schemas']['GetBanksResponseDto'][]>(`/banks?countryCode=${countryCode}`);
    return response.data.find((bank) => bank.code === code);
  }

}
