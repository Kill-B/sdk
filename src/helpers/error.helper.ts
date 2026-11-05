import { AxiosError } from 'axios';

import { HttpStatus } from '../types';

export class KillBError extends Error {
  path: string;
  status?: HttpStatus;
  errorCode?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- public field; narrowing it would break consumers' builds
  details?: any;

  constructor(input: { path: string; data: unknown; isAuthentic?: boolean }) {
    let message = 'unknown error';
    if (input.data instanceof Error) message = input.data.message;
    super(message);
    Object.setPrototypeOf(this, KillBError.prototype);
    this.name = KillBError.name;
    this.path = input.path;

    if (input.data instanceof AxiosError) {
      const data = input.data;
      const response = data.response?.data;
      this.status = data.response?.status;
      this.errorCode = response?.errorCode || response?.message || 'unknown error';
      this.details = response?.message || {};
    }

    if (process.env.DEBUG === 'true') console.error(this);
  }
}
