import {AxiosError} from 'axios';
import { HttpStatus } from '../types';

export class KillBError extends Error {
  path: string;
  status?: HttpStatus;
  errorCode?: string;
  details: any;

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
      this.status = response?.status;
      this.errorCode = response?.errorCode;
      this.message = JSON.stringify(response?.messages || ['unknown error']);
    } else {
      this.details = input.data;
    }


    console.error(this);
  }
}
