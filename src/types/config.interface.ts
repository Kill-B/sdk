export interface Config {
  testEnv: boolean;
  credentials: {
    apiKey: string;
    email: string;
    password: string;
    webhookSecret?: string;
  };
}
