import { Users } from './users';
import { Config } from './types';
import { Accounts } from './accounts';

export class Client {
  private config: Config;
  public users: Users;
  public accounts: Accounts;
  constructor(input: Config) {
    this.config = input;
    this.users = new Users(this.config);
    this.accounts = new Accounts(this.config);
  }
}
