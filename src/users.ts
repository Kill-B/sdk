import { ApiRequest } from './apiRequest';
import { components, paths } from './types';
import FormData from 'form-data';
import * as fs from "fs";

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
    const response = await this.api.post<components['schemas']['CreateUserResponseDto']>('/users', body);
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
    return this.api.patch(`/users/${id}`, body);
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
    return this.api.delete(`/users/${id}`);
  }

  /**
   * Lists all users.
   *
   * This method sends a GET request to the '/users' endpoint with the provided query parameters.
   *
   * @param query - The query parameters for the GET request. Optional.
   * @returns A promise that resolves to the list of users, conforming to the 'GetUserQueryResponse' schema.
   */
  public async list(query?:  paths["/users"]["get"]['parameters']['query']): Promise<components['schemas']['GetUserQueryResponse']> {
    await this.authenticateCheck();
    const queryParams = '?' + new URLSearchParams(query as Record<string, any> || {}).toString();
    const response = await this.api.get(`/users${queryParams}`);
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
    form.append('frontDocument', input.frontDocument, { filename: 'frontDocument.png', contentType: 'image/png' });
    input.backDocument ? form.append('backDocument', input.backDocument, { filename: 'backDocument.png', contentType: 'image/png' }) : null;

    const headers = {
      ...form.getHeaders(),
    };

    await this.api.post('users/person/document', form, { headers })
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

    const headers = {
      ...form.getHeaders(),
    };

    await this.api.post('users/company/document', form, { headers })
  }
}
