import { ApiRequest } from './apiRequest';
import { components, paths } from './types';

/**
 * The Users class provides methods for managing users.
 *
 * It extends the ApiRequest class, inheriting its methods and properties.
 * It provides methods to create, update, delete, get, and list users.
 * Each method first checks if the user is authenticated before making the API request.
 *
 * @extends {ApiRequest}
 */
export class Users extends ApiRequest {

  /**
   * Creates a new user.
   *
   * This method sends a POST request to the '/users' endpoint with the provided body.
   * The body should conform to the 'CreateUserDto' schema.
   *
   * @param body - The data for the new user. Should conform to the 'CreateUserDto' schema.
   * @returns A promise that resolves to the created user data, conforming to the 'CreateUserResponseDto' schema.
   */
  public async create(body: components['schemas']['CreateUserDto']): Promise<components['schemas']['CreateUserResponseDto']> {
    await this.authenticateCheck();
    const response = await this.api.post<components['schemas']['CreateUserResponseDto']>('api/v2/users', body);
    return response.data;
  }

  /**
   * Updates an existing user.
   *
   * This method sends a PATCH request to the '/users/{id}' endpoint with the provided body.
   * The body should conform to either the 'CreatePersonUserDto' or 'CreateCompanyUserDto' schema.
   *
   * @param id - The ID of the user to update.
   * @param body - The data for the user update. Should conform to either the 'CreatePersonUserDto' or 'CreateCompanyUserDto' schema.
   * @returns A promise that resolves to the updated user data, conforming to the 'CreateUserResponseDto' schema.
   */
  public async update(id: string, body: components['schemas']['CreatePersonUserDto'] | components['schemas']['CreateCompanyUserDto']): Promise<components['schemas']['CreateUserResponseDto']> {
    await this.authenticateCheck();
    const response = await  this.api.patch(`api/v2/users/${id}`, body);
    return response.data;
  }

  /**
   * Deletes a user.
   *
   * This method sends a DELETE request to the '/users/{id}' endpoint.
   *
   * @param id - The ID of the user to delete.
   * @returns A promise that resolves when the user is deleted.
   */
  public async delete(id: string): Promise<void> {
    await this.authenticateCheck();
    await this.api.delete(`api/v2/users/${id}`);
  }

  /**
   * Lists all users.
   *
   * This method sends a GET request to the '/users' endpoint with the provided query parameters.
   *
   * @param query - The query parameters for the GET request. Optional.
   * @returns A promise that resolves to the list of users, conforming to the 'GetUserQueryResponse' schema.
   */
  public async list(query?:  paths["/api/v2/users"]["get"]['parameters']['query']): Promise<components['schemas']['GetUserQueryResponse']> {
    await this.authenticateCheck();
    const queryParams = '?' + new URLSearchParams(query as Record<string, any> || {}).toString();
    const response = await  this.api.get(`api/v2/users${queryParams}`);
    return response.data;
  }

  /**
   * Retrieves user information by their unique identifier.
   *
   * @param {paths["/api/v2/users/{id}"]["get"]['parameters']['path']['id']} id - The unique identifier of the user.
   * @return {Promise<components['schemas']['GetUserByIdResponse']>} A promise resolving to the user's information.
   */
  public async getById(id: paths["/api/v2/users/{id}"]["get"]['parameters']['path']['id']): Promise<components['schemas']['GetUserByIdResponse']> {
    await this.authenticateCheck();
    const response = await this.api.get(`api/v2/users/${id}`);
    return response.data;
  }

  /**
   * Uploads a document for a person user.
   *
   * This method is responsible for uploading a document associated with a person user. It constructs a FormData object
   * to encapsulate the document details, including the user ID, document type, and the document files (front and optionally back).
   * The FormData is then sent as a POST request to the 'users/person/document' endpoint.
   *
   * @param input - An object containing the document upload details. Must conform to the 'UploadPersonDocumentDto' schema.
   * @returns A promise that resolves when the document upload is successful.
   */
  public async uploadPersonDocument(input: components['schemas']['UploadPersonDocumentDto']): Promise<void> {
    await this.authenticateCheck();
    const form = new FormData();
    form.append('userId', input.userId);
    form.append('documentType', input.documentType);
    form.append('frontDocument', input.frontDocument);
    input.backDocument ? form.append('backDocument', input.backDocument) : null;
    const response =  await this.api.post('api/v2/users/person/document', form);
    return response.data;
  }

  /**
   * Uploads a document for a person user.
   *
   * This method is responsible for uploading a document associated with a person user. It constructs a FormData object
   * to encapsulate the document details, including the user ID, document type, and the document files (front and optionally back).
   * The FormData is then sent as a POST request to the 'users/person/document' endpoint.
   *
   * @param input - An object containing the document upload details. Must conform to the 'UploadPersonDocumentDto' schema.
   * @returns A promise that resolves when the document upload is successful.
   */
  public async uploadCompanyDocument(input: components['schemas']['UploadBusinessDocumentDto']): Promise<void> {
    await this.authenticateCheck();
    const form = new FormData();
    form.append('userId', input.userId);
    form.append('documentType', input.documentType);
    form.append('frontDocument', input.frontDocument);
    input.backDocument ? form.append('backDocument', input.backDocument) : null;
    const response = await this.api.post('api/v2/users/company/document', form);
    return response.data;
  }
}
