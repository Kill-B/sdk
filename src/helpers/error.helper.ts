import {AxiosError} from 'axios';
import { HttpStatus } from '../types';

export class KillBError extends Error {
  path: string;
  status?: HttpStatus;
  errorCode?: string;
  details?: any;

  constructor(input: { path: string, data: unknown, isAuthentic?: boolean}) {
    let message = 'unknown error';
    if (input.data instanceof Error) message = input.data.message;
    super(message);
    Object.setPrototypeOf(this, KillBError.prototype);
    this.name = KillBError.name;
    this.path = input.path;

    if (input.data instanceof AxiosError) {
      const data = input.data as AxiosError<any>;
      const response = data.response?.data;
      this.status = data.response?.status;
      this.errorCode = response?.errorCode || response?.message || 'unknown error';
      this.details = response?.message || {};
    }


    process.env.DEBUG === 'true' && console.error(this);
  }
}
