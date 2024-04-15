import { Users } from './users';

export class Client {
  private config: any;
  public users: Users;
  constructor(input: any) {
    this.config = input;
    this.users = new Users({});
  }
}
