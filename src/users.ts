import { ApiRequest } from './apiRequest';
import { UserResponse, UserInput, GetUserQueryParams, UserQueryResponse } from './types/users.inteface';

/**
 * The Users class extends the ApiRequest class and provides methods for interacting with the User-related endpoints of the API.
 * It includes methods for creating, updating, deleting, retrieving a single user and listing all users.
 * Each method first checks if the user is authenticated before making the API request.
 *
 * @extends {ApiRequest}
 */
export class Users extends ApiRequest {

  /**
   * Creates a new user.
   *
   * This method sends a POST request to the '/users' endpoint with the provided user data.
   *
   * @param {UserInput} body - The data of the user to be created.
   * @returns {Promise<UserResponse>} The created user's data.
   * @throws {KillBError} e.g. If the user is not authenticated.
   */
  public async create(body: UserInput): Promise<UserResponse> {
    await this.authenticateCheck();
    return this.api.post('/users', body);
  }

  /**
   * Updates an existing user.
   *
   * This method sends a PATCH request to the '/users/{id}' endpoint with the provided user data.
   *
   * @param {string} id - The UUID of the user to be updated.
   * @param {UserInput} body - The new data for the user.
   * @returns {Promise<UserResponse>} The updated user's data.
   * @throws {KillBError} e.g. If the user is not authenticated.
   */
  public async update(id: string, body: UserInput): Promise<UserResponse> {
    await this.authenticateCheck();
    return this.api.patch(`/users/${id}`, body);
  }

  /**
   * Deletes a user.
   *
   * This method sends a DELETE request to the '/users/{id}' endpoint.
   *
   * @param {string} id - The UUID of the user to be deleted.
   * @returns {Promise<void>}
   * @throws {KillBError} e.g. If the user is not authenticated.
   */
  public async delete(id: string): Promise<void> {
    await this.authenticateCheck();
    return this.api.delete(`/users/${id}`);
  }

  /**
   * Retrieves a user.
   *
   * This method sends a GET request to the '/users/{id}' endpoint.
   *
   * @param {string} id - The UUID of the user to be retrieved.
   * @returns {Promise<UserResponse>} The retrieved user's data.
   * @throws {KillBError} e.g. If the user is not authenticated.
   */
  public async get(id: string): Promise<UserResponse> {
    await this.authenticateCheck();
    return this.api.get(`/users/${id}`);
  }

  /**
   * Lists all users.
   *
   * This method sends a GET request to the '/users' endpoint with optional query parameters.
   *
   * @param {GetUserQueryParams} [query] - Optional query parameters for listing users.
   * @returns {Promise<UserQueryResponse>} The list of users.
   * @throws {KillBError} e.g. If the user is not authenticated.
   */
  public async list(query?: GetUserQueryParams): Promise<UserQueryResponse> {
    await this.authenticateCheck();
    const queryParams = '?' + new URLSearchParams(query as Record<string, string> || {}).toString();
    return this.api.get(`/users${queryParams}`);
  }

}
