import { ApiRequest } from './apiRequest';
import { components } from './types';

export class Customer extends ApiRequest {

  /**
   * Retrieves the balances for the customer.
   *
   * to the '/customers/balances' endpoint to fetch the balances. The response contains
   * an array of balance details conforming to the 'GetBalancesResponseDto' schema.
   *
   * @returns {Promise<components['schemas']['GetBalancesResponseDto'][]>} A promise that resolves to an array of balance details.
   */
  public async getBalances() {
    await this.authenticateCheck();
    const response = await this.api.post<components['schemas']['GetBalancesResponseDto'][]>('/customers/balances');
    return response.data;
  }
}
