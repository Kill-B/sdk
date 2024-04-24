import { ApiRequest } from './apiRequest';
import { components, CreateAccountInput, CreateAccountResponse } from './types';

/**
 * The Accounts class provides methods for managing accounts.
 *
 * It extends the ApiRequest class, inheriting its methods and properties.
 * It provides methods to create, update, and retrieve accounts, as well as methods to retrieve banks by country and specific bank by country and code.
 * Each method first checks if the user is authenticated before making the API request.
 *
 * @extends {ApiRequest}
 */
export class Accounts extends ApiRequest {

  /**
   * Simulates a quotation.
   *
   * This method sends a POST request to the '/quotations/simulation' endpoint with the provided body.
   * The body should conform to the 'CreateQuotationDto' schema.
   *
   * @param body - The data for the quotation simulation. Should conform to the 'CreateQuotationDto' schema.
   * @returns A promise that resolves to the simulated quotation data, conforming to the 'SimulateQuotationResponseDto' schema.
   */
  public async create(body: CreateAccountInput): Promise<CreateAccountResponse> {
    await this.authenticateCheck();
    const response = await this.api.post('/accounts', body);
    return response.data;
  }

  /**
   * Updates an existing account.
   *
   * This method sends a PATCH request to the '/accounts/{id}' endpoint with the provided body.
   * The body should conform to the 'UpdateAccountResponseDto' schema.
   *
   * @param id - The ID of the account to be updated.
   * @param body - The data for the account update. Should conform to the 'UpdateAccountResponseDto' schema.
   * @returns A promise that resolves to the updated account data, conforming to the 'CreateAccountResponseDto' schema.
   */
  public async update(id: string, body: components['schemas']['UpdateAccountResponseDto']): Promise<components['schemas']['CreateAccountResponseDto']> {
    await this.authenticateCheck();
    const response = await this.api.patch(`/accounts/${id}`, body);
    return response.data;
  }

  /**
   * Retrieves an account by its ID.
   *
   * This method sends a GET request to the '/accounts/{id}' endpoint.
   *
   * @param id - The ID of the account to be retrieved.
   * @returns A promise that resolves to the account data, conforming to the 'CreateAccountResponseDto' schema.
   */
  public async getById(id: string): Promise<components['schemas']['CreateAccountResponseDto']> {
    await this.authenticateCheck();
    const response = await this.api.get(`/accounts/${id}`);
    return response.data;
  }

  /**
   * Retrieves all accounts associated with a specific user ID.
   *
   * This method sends a GET request to the '/accounts/userId/{userId}' endpoint.
   *
   * @param userId - The ID of the user whose accounts are to be retrieved.
   * @returns A promise that resolves to an array of account data, each conforming to the 'CreateAccountResponseDto' schema.
   */
  public async getByUserId(userId: string): Promise<components['schemas']['CreateAccountResponseDto'][]> {
    await this.authenticateCheck();
    const response = await this.api.get(`/accounts/userId/${userId}`);
    return response.data;
  }

  /**
   * Retrieves all banks by country.
   *
   * This method sends a GET request to the '/banks' endpoint with the provided country code as a query parameter.
   *
   * @param countryCode - The country code for which banks are to be retrieved.
   * @returns A promise that resolves to an array of bank data, each conforming to the 'GetBanksResponseDto' schema.
   */
  public async getBanksByCountry(countryCode: string): Promise<components['schemas']['GetBanksResponseDto'][]> {
    await this.authenticateCheck();
    const response = await this.api.get(`/banks?countryCode=${countryCode}`);
    return response.data;
  }

  /**
   * Retrieves a specific bank by country and code.
   *
   * This method sends a GET request to the '/banks' endpoint with the provided country code as a query parameter.
   * It then filters the response to find a bank with the provided code.
   *
   * @param countryCode - The country code for which banks are to be retrieved.
   * @param code - The code of the specific bank to be retrieved.
   * @returns A promise that resolves to the bank data conforming to the 'GetBanksResponseDto' schema, or undefined if no bank with the provided code is found.
   */
  public async getBankByCountry(countryCode: string, code: string): Promise<components['schemas']['GetBanksResponseDto'] | undefined> {
    await this.authenticateCheck();
    const response = await this.api.get<components['schemas']['GetBanksResponseDto'][]>(`/banks?countryCode=${countryCode}`);
    return response.data.find((bank) => bank.code === code);
  }

}
