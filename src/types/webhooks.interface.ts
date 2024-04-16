export interface WebhookInput {
  url: string;
  secret: string;
  events: ('RAMP' | 'USER'| 'TRANSACTION' | 'ACCOUNT')[];
}

export interface WebhookResponse {
  id: string;
  customerId: string;
  url: string;
  active: boolean;
  secret: string;
  events: ('RAMP' | 'USER'| 'TRANSACTION' | 'ACCOUNT')[];
  createdAt: string;
  updatedAt: string;
}
