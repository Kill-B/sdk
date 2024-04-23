import { ApiRequest } from './apiRequest';
import { components, paths } from './types';

/**
 * The Users class extends the ApiRequest class and provides methods for interacting with the User-related endpoints of the API.
 * It includes methods for creating, updating, deleting, retrieving a single user and listing all users.
 * Each method first checks if the user is authenticated before making the API request.
 *
 * @extends {ApiRequest}
 */
export class Users extends ApiRequest {

  public async create(body: components['schemas']['CreateUserDto']): Promise<components['schemas']['CreateUserResponseDto']> {
    await this.authenticateCheck();
    const response = await this.api.post<components['schemas']['CreateUserResponseDto']>('/users', body);
    return response.data;
  }

  public async update(id: string, body: components['schemas']['CreatePersonUserDto'] | components['schemas']['CreateCompanyUserDto']): Promise<components['schemas']['CreateUserResponseDto']> {
    await this.authenticateCheck();
    return this.api.patch(`/users/${id}`, body);
  }

  public async delete(id: string): Promise<void> {
    await this.authenticateCheck();
    return this.api.delete(`/users/${id}`);
  }

  // /**
  //  * Retrieves a user.
  //  *
  //  * This method sends a GET request to the '/users/{id}' endpoint.
  //  *
  //  * @param {string} id - The UUID of the user to be retrieved.
  //  * @returns {Promise<UserResponse>} The retrieved user's data.
  //  * @throws {KillBError} e.g. If the user is not authenticated.
  //  */
  // public async get(id: string): Promise<UserResponse> {
  //   await this.authenticateCheck();
  //   return this.api.get(`/users/${id}`);
  // }

  public async list(query?:  paths["/users"]["get"]['parameters']['query']): Promise<components['schemas']['GetUserQueryResponse']> {
    await this.authenticateCheck();
    const queryParams = '?' + new URLSearchParams(query as Record<string, string> || {}).toString();
    return this.api.get(`/users${queryParams}`);
  }

}
