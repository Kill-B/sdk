import { ApiRequest } from './apiRequest';
import { components, paths } from './types';

/**
 * The Ramps class provides methods for managing ramps.
 *
 * It extends the ApiRequest class, inheriting its methods and properties.
 * It provides methods to create and list ramps.
 * Each method first checks if the user is authenticated before making the API request.
 *
 * @extends {ApiRequest}
 */
export class Ramps extends ApiRequest {

  /**
   * Creates a new ramp.
   *
   * This method sends a POST request to the '/ramps' endpoint with the provided body.
   * The body should conform to the 'CreateRampInputDto' schema.
   *
   * @param body - The data for the new ramp. Should conform to the 'CreateRampInputDto' schema.
   * @returns A promise that resolves to the created ramp data, conforming to the 'CreateRampResponseDto' schema.
   */
  public async create(body: components['schemas']['CreateRampInputDto']): Promise<components['schemas']['CreateRampResponseDto']> {
    await this.authenticateCheck();
    const response = await this.api.post<components['schemas']['CreateRampResponseDto']>('/ramps', body);
    return response.data;
  }

  /**
   * Lists all ramps.
   *
   * This method sends a GET request to the '/ramps' endpoint with the provided query parameters.
   *
   * @param query - The query parameters for the GET request. Optional.
   * @returns A promise that resolves to the list of ramps, conforming to the 'GetRampQueryResponseDto' schema.
   */
  public async list(query?: paths["/ramps"]["get"]['parameters']['query']): Promise<components['schemas']['GetRampQueryResponseDto']> {
    await this.authenticateCheck();
    const queryParams = '?' + new URLSearchParams(query as any || {}).toString();
    const response = await this.api.get<components['schemas']['GetRampQueryResponseDto']>(`/ramps${queryParams}`);
    return response.data;
  }
}
