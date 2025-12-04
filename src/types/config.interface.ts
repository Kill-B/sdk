export interface Config {
  testEnv: boolean;
  credentials: {
    email: string;
    password: string;
    webhookSecret?: string;
  };
}
