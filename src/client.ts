import { Users } from './users';
import { Config } from './types';

export class Client {
  private config: Config;
  public users: Users;
  constructor(input: Config) {
    this.config = input;
    this.users = new Users(this.config);
  }
}
