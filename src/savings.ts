import { ApiRequest } from './apiRequest';
import { components, paths } from './types';

export class Savings extends ApiRequest {

  /**
   * Creates a new savings account.
   *
   * This method sends a POST request to the '/savings' endpoint with the provided body.
   * The body should conform to the 'SavingsCustodialAccountDto' schema.
   *
   * @param body - The data for the new savings account. Should conform to the 'SavingsCustodialAccountDto' schema.
   * @returns A promise that resolves to the created savings account data, conforming to the 'SavingsAccountResponseDto' schema.
   */
  public async create(body: components['schemas']['SavingsCustodialAccountDto']): Promise<components['schemas']['SavingsAccountResponseDto']> {
    await this.authenticateCheck();
    const response = await this.api.post('api/v2/savings', body);
    return response.data;
  }

  /**
   * Retrieves a savings account by its ID.
   *
   * This method sends a GET request to the '/savings/{id}' endpoint.
   *
   * @param id - The ID of the savings account to retrieve.
   * @returns A promise that resolves to the retrieved savings account data, conforming to the 'SavingsAccountResponseDto' schema.
   */
  public async get(id: string): Promise<components['schemas']['SavingsAccountResponseDto']> {
    await this.authenticateCheck();
    return this.api.get(`api/v2/savings/${id}`);
  }

  /**
   * Retrieves the balance of a savings account by its ID.
   *
   * This method sends a GET request to the '/savings/{id}/balances' endpoint.
   *
   * @param id - The ID of the savings account to retrieve the balance for.
   * @returns A promise that resolves to the balance data of the savings account, conforming to the 'GetBalanceReturn' schema.
   */
  public async getBalance(id: string): Promise<components['schemas']['GetBalanceReturn']> {
    await this.authenticateCheck();
    return this.api.get(`api/v2/savings/${id}/balances`);
  }

  /**
   * Creates a withdrawal from a savings account.
   *
   * This method sends a POST request to the '/savings/withdrawals' endpoint with the provided body.
   * The body should conform to the 'CreateWithdrawalDto' schema.
   *
   * @param body - The data for the new withdrawal. Should conform to the 'CreateWithdrawalDto' schema.
   * @returns A promise that resolves to the created withdrawal data, conforming to the 'WithdrawalSavingsReturn' schema.
   */
  public async createWithdrawal(body: components['schemas']['CreateWithdrawalDto']): Promise<components['schemas']['WithdrawalSavingsReturn']> {
    await this.authenticateCheck();
    const response = await this.api.post('api/v2/savings/withdrawal', body);
    return response.data;
  }

  /**
   * Retrieves the transactions of a savings account.
   *
   * This method sends a GET request to the '/savings/transactions' endpoint with the provided query parameters.
   *
   * @param query - The query parameters for the GET request. Optional.
   * @returns A promise that resolves to the transactions data of the savings account, conforming to the 'getTransactionsReturn' schema.
   */
  public async getTransactions(query?: paths["/api/v2/savings/transactions"]["get"]['parameters']['query']): Promise<any> {
    await this.authenticateCheck();
    const queryParams = '?' + new URLSearchParams(query as Record<string, string> || {}).toString();
    return this.api.get(`api/v2/savings/transactions${queryParams}`);
  }

  /**
   * Retrieves the banking deposit instructions for a savings account.
   *
   * This method sends a GET request to the '/savings/{id}/deposit-instructions/{method}' endpoint.
   *
   * @param id - The ID of the savings account to retrieve the deposit instructions for.
   * @param method - The deposit method. Can be either 'ACH' or 'WIRE'.
   * @returns A promise that resolves to the deposit instructions data of the savings account, conforming to either the 'GetDepositInstructionsACHReturn' or 'GetDepositInstructionsWireReturn' schema, depending on the method.
   */
  public async getBankingDepositInstructions(id: string, method: 'ACH' | 'WIRE'): Promise<components['schemas']['GetDepositInstructionsReturn']> {
    await this.authenticateCheck();
    return this.api.get(`api/v2/savings/${id}/deposit-instructions/${method}`);
  }

  /**
   * Retrieves the crypto deposit instructions for a savings account.
   *
   * This method sends a GET request to the '/savings/{id}/crypto-deposit-instructions' endpoint.
   *
   * @param id - The ID of the savings account to retrieve the crypto deposit instructions for.
   * @returns A promise that resolves to the crypto deposit instructions data of the savings account, conforming to the 'GetCryptoDepositInstructionsReturn' schema.
   */
  public async getCryptoDepositInstructions(id: string): Promise<components['schemas']['GetCryptoDepositInstructionsReturn']> {
    await this.authenticateCheck();
    return this.api.get(`api/v2/savings/${id}/crypto-deposit-instructions`);
  }
}
