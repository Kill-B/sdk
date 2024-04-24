import { Users } from './users';
import { Config } from './types';
import { Accounts } from './accounts';
import { Quotation } from './quotation';
import { Ramps } from './ramps';
import { Webhook } from './webhook';
import { Savings } from './savings';

/**
 * The Client class is the main entry point for interacting with the various services.
 *
 * It provides access to the Users, Accounts, Quotation, Ramps, Webhook, and Savings services.
 * Each service is instantiated with the same configuration object, which is passed to the Client constructor.
 *
 * @example
 * const client = new Client(config);
 * const users = client.users;
 * const accounts = client.accounts;
 * // etc.
 *
 * @property {Users} users - Provides access to user-related operations.
 * @property {Accounts} accounts - Provides access to account-related operations.
 * @property {Quotation} quotation - Provides access to quotation-related operations.
 * @property {Ramps} ramps - Provides access to ramp-related operations.
 * @property {Webhook} webhook - Provides access to webhook-related operations.
 * @property {Savings} savings - Provides access to savings-related operations.
 */
export class Client {
  private config: Config;
  public users: Users;
  public accounts: Accounts;
  public quotation: Quotation;
  public ramps: Ramps;
  public webhook: Webhook;
  public savings: Savings;

  /**
   * Creates a new Client instance.
   *
   * @param {Config} input - The configuration object. This is passed to all service instances.
   */
  constructor(input: Config) {
    this.config = input;
    this.users = new Users(this.config);
    this.accounts = new Accounts(this.config);
    this.quotation = new Quotation(this.config);
    this.ramps = new Ramps(this.config);
    this.webhook = new Webhook(this.config);
    this.savings = new Savings(this.config);
  }
}
