import { Client } from '../../client';
import { faker } from '@faker-js/faker';
import { components } from '../../types';

describe('createUser', () => {
  it('should throw an error when the user credentials is invalid', async () => {
    const userInput = { name: 'John Doe', email: 'john.doe@example.com' } as any;

    const client = new Client({
      testEnv: true,
      credentials: {
        email: 'invalid_email@killb.com',
        password: 'invalid_password',
      }
    });
    const users = client.users;

    await expect(users.create(userInput)).rejects.toMatchObject({
      status: 400,
      errorCode: 'INVALID.INPUT',
      details: [ 'password is not strong enough' ],
    });
  });

  it('should create a new user with the minimal required data', async () => {
    const client = new Client({
      testEnv: true,
      credentials: {
        email: process.env.EMAIL as string,
        password: process.env.PASSWORD as string,
      }
    });

    const userInput: components['schemas']['CreateUserDto'] = {
      type: 'PERSON',
      data: {
        firstName: 'John',
        lastName: 'Doe',
        dateOfBirth: '1990-01-01',
        email: 'john.doe@killb.com',
        phone: '+5511977079096',
        address: {
          street1: '123 Main St',
          city: 'Springfield',
          state: 'IL',
          zipCode: '62701',
          countryCode: 'US',
        },
        document: {
          type: 'PASSPORT',
          number: faker.number.hex({ min: 9, max: 15}),
          issuedCountryCode: 'CO',

        },
      }
    };

    const users = client.users.create(userInput);

    await expect(users).resolves.toMatchObject({
      id: expect.any(String),
    });

  })
});
