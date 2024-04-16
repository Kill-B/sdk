import { Users } from './users';
import { Config } from './types';
import { Accounts } from './accounts';
import { Quotation } from './quotation';
import { Ramps } from './ramps';

export class Client {
  private config: Config;
  public users: Users;
  public accounts: Accounts;
  public quotation: Quotation;
  public ramps: Ramps;
  constructor(input: Config) {
    this.config = input;
    this.users = new Users(this.config);
    this.accounts = new Accounts(this.config);
    this.quotation = new Quotation(this.config);
    this.ramps = new Ramps(this.config);
  }
}
