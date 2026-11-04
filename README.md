# KillB SDK

Welcome to the KillB SDK! This is an open-source project designed to facilitate and decrease the integration time with the KillB API. KillB is a fintech that provides ramp infrastructure and savings account services.

## Installation

This project uses npm for package management. To install the project: 

```bash
npm install @killb/sdk
```
## Quickstart
Here's a quick guide on how to use the SDK: 

```typescript
import { Client, Config } from './src/client';

const config: Config = {
  testEnv: true, // Optional. Default is false.
  credentials: {
    email: 'your-email',
    password: 'your-password',
  }
};

const client = new Client(config);

const users = await client.users.create({ ... });
const accounts = client.accounts;
// etc.
```

## API Overview
This project provides the following services:  
**Users**: Provides access to user-related operations.
**Accounts**: Provides access to account-related operations.
**Quotation**: Provides access to quotation-related operations.
**Ramps**: Provides access to ramp-related operations.
**Webhook**: Provides access to webhook-related operations.
**Savings**: Provides access to savings-related operations.
Each service is instantiated with the same configuration object, which is passed to the Client constructor.


## Verifying webhooks
Every webhook carries an `X-KillB-Signature` header (`t=<unix seconds>,v1=<HMAC-SHA256>`). Verify it against the raw body, exactly as received, with the webhook secret set in `credentials.webhookSecret`:

```typescript
import express from 'express';

app.post('/webhooks/killb', express.raw({ type: 'application/json' }), (req, res) => {
  if (!client.webhook.verifySignature(req.body, req.headers)) {
    return res.status(401).send('Invalid signature');
  }
  const event = JSON.parse(req.body.toString('utf8'));
  // handle the event, skipping ids you have already processed
  res.sendStatus(200);
});
```

Signatures older than 5 minutes are rejected; pass `{ toleranceSeconds }` as the third argument to change it. `validateEvent`, which checks the legacy `x-signature-sha256` header, is deprecated.

## API Reference
Feel free to take a look at our API docs. You can find them [here](https://killbapi.stoplight.io/docs/killb-v2).

## Contributing
Contributions are welcome.

## License
This project is open source and available under the [MIT](LICENSE) License
