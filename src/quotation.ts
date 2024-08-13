import { ApiRequest } from './apiRequest';
import { components } from './types';

/**
 * The Quotation class provides methods for managing quotations.
 *
 * It extends the ApiRequest class, inheriting its methods and properties.
 * It provides a method to create a quotation.
 * Before sending the request, it checks if the user is authenticated.
 *
 * @extends {ApiRequest}
 */
export class Quotation extends ApiRequest {

  /**
   * Creates a new quotation.
   *
   * This method sends a POST request to the '/quotations' endpoint with the provided body.
   * The body should conform to the 'CreateQuotationDto' schema.
   *
   * @param body - The data for the new quotation. Should conform to the 'CreateQuotationDto' schema.
   * @returns A promise that resolves to the created quotation data, conforming to the 'CreateQuotationResponseDto' schema.
   */
  public async create(body: components['schemas']['CreateQuotationDto']): Promise<components['schemas']['CreateQuotationResponseDto']> {
    await this.authenticateCheck();
    const response = await this.api.post<components['schemas']['CreateQuotationResponseDto']>('/quotations', body);
    return response.data;
  }

  /**
   * Simulates a quotation.
   *
   * This method sends a POST request to the '/quotations/simulation' endpoint with the provided body.
   * The body should conform to the 'CreateQuotationDto' schema.
   *
   * @param body - The data for the quotation simulation. Should conform to the 'CreateQuotationDto' schema.
   * @returns A promise that resolves to the simulated quotation data, conforming to the 'SimulateQuotationResponseDto' schema.
   */
  public async simulation(body: components['schemas']['CreateQuotationDto']): Promise<components['schemas']['SimulateQuotationResponseDto']> {
    await this.authenticateCheck();
    const response = await this.api.post<components['schemas']['SimulateQuotationResponseDto']>('/quotations/simulation', body);
    return response.data;
  }

  /**
   * Retrieves a quotation by its ID.
   *
   * This method sends a GET request to the '/quotations/{id}' endpoint to fetch the details of a specific quotation.
   * The ID of the quotation is passed as a parameter.
   * The response contains the quotation details conforming to the 'CreateQuotationResponseDto' schema.
   *
   * @param {string} id - The ID of the quotation to retrieve
   * @returns {Promise<components['schemas']['CreateQuotationResponseDto']>} A promise that resolves to the quotation details.
   */
  public async getById(id: string): Promise<components['schemas']['CreateQuotationResponseDto']> {
    await this.authenticateCheck();
    const response = await this.api.get<components['schemas']['CreateQuotationResponseDto']>(`/quotations/${id}`);
    return response.data;
  }
}
