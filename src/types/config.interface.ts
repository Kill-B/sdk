export interface Config {
  testEnv: boolean;
  accessToken?: string;
  expiresIn?: number;
  credentials: {
    apiKey: string;
    email: string;
    password: string;
    webhookSecret?: string;
  };
}
