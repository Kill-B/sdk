import { ApiRequest } from './apiRequest';
import { AccountInput, AccountResponse, AccountUpdateInput } from './types/accounts.interface';

export class Accounts extends ApiRequest {

  public async create(body: AccountInput): Promise<AccountResponse> {
    await this.authenticateCheck();
    const response = await this.api.post('/accounts', body);
    return response.data;
  }

  public async update(id: string, body: AccountUpdateInput): Promise<AccountResponse> {
    await this.authenticateCheck();
    const response = await this.api.patch(`/accounts/${id}`, body);
    return response.data;
  }

  public async getById(id: string): Promise<AccountResponse> {
    await this.authenticateCheck();
    const response = await this.api.get(`/accounts/${id}`);
    return response.data;
  }

  public async getByUserId(userId: string): Promise<AccountResponse[]> {
    await this.authenticateCheck();
    const response = await this.api.get(`/accounts/userId/${userId}`);
    return response.data;
  }

}
