import { ApiRequest } from './apiRequest';
import { components } from './types';

export class Customer extends ApiRequest {
  /**
   * Retrieves the balances for the customer.
   *
   * This method sends a GET request to the '/customers/balances' endpoint. The response contains
   * an array of balance details conforming to the 'GetBalancesResponseDto' schema.
   *
   * @returns {Promise<components['schemas']['GetBalancesResponseDto'][]>} A promise that resolves to an array of balance details.
   */
  public async getBalances() {
    await this.authenticateCheck();
    const response = await this.api.get<components['schemas']['GetBalancesResponseDto'][]>('api/v2/customers/balances');
    return response.data;
  }
}
