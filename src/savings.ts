import { ApiRequest } from './apiRequest';
import { components, paths } from './types';

export class Savings extends ApiRequest {

  public async create(body: components['schemas']['SavingsCustodialAccountDto']): Promise<components['schemas']['SavingsAccountResponseDto']> {
    await this.authenticateCheck();
    const response = await this.api.post('/savings', body);
    return response.data;
  }

  public async get(id: string): Promise<components['schemas']['SavingsAccountResponseDto']> {
    await this.authenticateCheck();
    return this.api.get(`/savings/${id}`);
  }

  public async getBalance(id: string): Promise<components['schemas']['GetBalanceReturn']> {
    await this.authenticateCheck();
    return this.api.get(`/savings/${id}/balances`);
  }

  public async createWithdrawal(body: components['schemas']['CreateWithdrawalDto']): Promise<components['schemas']['WithdrawalSavingsReturn']> {
    await this.authenticateCheck();
    const response = await this.api.post('/savings/withdrawals', body);
    return response.data;
  }

  public async getTransactions(query?: paths["/savings/transactions"]["get"]['parameters']['query']): Promise<components['schemas']['getTransactionsReturn']> {
    await this.authenticateCheck();
    const queryParams = '?' + new URLSearchParams(query as Record<string, string> || {}).toString();
    return this.api.get(`/savings/transactions${queryParams}`);
  }

  public async getBankingDepositInstructions(id: string, method: 'ACH' | 'WIRE'): Promise<components['schemas']['GetDepositInstructionsACHReturn'] | components['schemas']['GetDepositInstructionsWireReturn']> {
    await this.authenticateCheck();
    return this.api.get(`/savings/${id}/deposit-instructions/${method}`);
  }

  public async getCryptoDepositInstructions(id: string): Promise<components['schemas']['GetCryptoDepositInstructionsReturn']> {
    await this.authenticateCheck();
    return this.api.get(`/savings/${id}/crypto-deposit-instructions`);
  }
}
