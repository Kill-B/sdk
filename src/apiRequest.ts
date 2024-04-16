import axios, { AxiosInstance, AxiosError } from 'axios';
import { KillBError } from './helpers';
import { Config } from './types';

export class ApiRequest {
  protected config: Config;
  protected api: AxiosInstance;
  constructor(input: Config) {
    this.config = input;
    this.api = axios.create({
      baseURL: this.setHost(input.testEnv),
      timeout: 30000,
      headers: {
        'x-api-key': input.credentials.apiKey,
      },
    });
    this.api.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        throw new KillBError({path: error.request.path, data: error})
      }
    );
  }
  get env () {
    return this.config.testEnv ? 'SANDBOX' : 'PRODUCTION';
  }

  private setHost(testEnv: boolean): string {
    if(testEnv) {
      return 'https://sandbox.killb.app/api/v2';
    }
    return 'https://killb.app/api/v2';
  }

  private async authenticate() {
    const response = await this.api.post('/auth/login', {
      email: this.config.credentials.email,
      password: this.config.credentials.password,
    });

    this.config.accessToken = response.data.accessToken;
    this.config.expiresIn = response.data.expiresIn;

    this.api = axios.create({
      baseURL: this.setHost(this.config.testEnv),
      timeout: 30000,
      headers: {
        'x-api-key': this.config.credentials.apiKey,
        'Authorization': `Bearer ${this.config.accessToken}`,
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

  protected async authenticateCheck() {
    if (
      !this.config.accessToken ||
      !this.config.expiresIn ||
      this.config.expiresIn < new Date().getTime()
    ) {
      await this.authenticate();
    }
  }
}
