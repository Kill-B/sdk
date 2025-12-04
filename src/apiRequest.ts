import axios, { AxiosInstance, AxiosError } from 'axios';
import { KillBError } from './helpers';
import { Config } from './types';
let accessToken: string;
let expiresAt = 0;

/**
 * The `ApiRequest` class is responsible for making HTTP requests to the API.
 *
 * It uses the axios library to send requests and includes methods for authentication.
 * The class constructor takes a `Config` object as input, which includes API credentials and environment settings.
 * The `authenticate` method is used to log in to the API and store the access token and expiry time.
 * The `authenticateCheck` method is used to check if the current access token is valid and re-authenticate if necessary.
 *
 * @property {Config} config - The configuration settings for the API requests.
 * @property {AxiosInstance} api - The axios instance used for making API requests.
 */
export class ApiRequest {
  protected config: Config;
  protected api: AxiosInstance;
  constructor(input: Config) {
    this.config = input;
    this.api = axios.create({
      baseURL: this.setHost(input.testEnv),
      timeout: 30000,
      headers: {
        ...(accessToken ? { 'Authorization': `Bearer ${accessToken}` } : {}),
      },
    });
    this.api.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        throw new KillBError({path: error.request.path, data: error})
      }
    );
  }

  /**
   * Returns the environment of the API ('SANDBOX' or 'PRODUCTION').
   *
   * @returns The environment of the API.
   */
  get env () {
    return this.config.testEnv ? 'SANDBOX' : 'PRODUCTION';
  }

  /**
   * Sets the host of the API based on the test environment.
   *
   * @param testEnv - The test environment setting.
   * @returns The host URL of the API.
   */
  private setHost(testEnv: boolean): string {
    if(testEnv) {
      return 'https://teste-94u93qnn.uc.gateway.dev';
    }
    return 'https://killb.app';
  }

  /**
   * Authenticate with the API.
   *
   * This method sends a POST request to the '/auth/login' endpoint with email and password.
   * It then stores the access token and expiry time returned by the API.
   *
   * @returns The response data from the API.
   * @throws Will throw an error if the server responds with an error.
   */
  private async authenticate() {
    const response = await this.api.post('api/v2/auth/login', {
      email: this.config.credentials.email,
      password: this.config.credentials.password,
    });

    accessToken = response.data.accessToken;
    expiresAt = response.data.expiresIn + new Date().getTime();

    this.api = axios.create({
      baseURL: this.setHost(this.config.testEnv),
      timeout: 30000,
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    })
    this.api.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        throw new KillBError({path: error.request.path, data: error})
      }
    );

    return response.data;
  }

  /**
   * Checks if the current access token is valid and re-authenticates if necessary.
   *
   * This method checks if the access token and expiry time are set and if the expiry time is in the future.
   * If any of these checks fail, it calls the `authenticate` method to re-authenticate.
   *
   * @throws Will throw an error if the server responds with an error during re-authentication.
   */
  protected async authenticateCheck() {
    if (
      !accessToken ||
      !expiresAt ||
      expiresAt < new Date().getTime()
    ) {
      await this.authenticate();
      return;
    }
    this.api.defaults.headers['Authorization'] = `Bearer ${accessToken}`;
  }
}
