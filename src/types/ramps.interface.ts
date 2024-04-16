export interface RampsInput {
  quotationId: string;
  userId: string;
  accountId: string;
}

export interface RampsResponse {
  id: string;
  active: boolean;
  fromCurrency: string;
  toCurrency: string;
  fromAmount: number;
  toAmount: number;
  quotationId: string;
  userId: string;
  cashInMethod: 'SPEI' | 'POLYGON' | 'ERC20' | 'PSE' | 'PRE_FUND';
  cashOutMethod: 'SPEI' | 'POLYGON' | 'ERC20' | 'PSE';
  accountId: string;
  status: 'CREATED' |
  'CASH_IN_REQUEST' |
  'CONVERSION_REQUEST' |
  'CASH_OUT_REQUEST' |
  'CASH_IN_REQUESTED' |
  'CONVERSION_REQUESTED' |
  'CASH_OUT_REQUESTED' |
  'CASH_IN_PENDING' |
  'CONVERSION_PENDING' |
  'CASH_OUT_PENDING' |
  'CASH_IN_PROCESSING' |
  'CONVERSION_PROCESSING' |
  'CASH_OUT_PROCESSING' |
  'CASH_IN_COMPLETED' |
  'CONVERSION_COMPLETED' |
  'CASH_OUT_COMPLETED' |
  'COMPLETED' |
  'CANCELED' |
  'FAILED' |
  'REJECTED' |
  'ERROR';
  isPreFunded?: boolean;
  paymentInfo: ({ url: string } | { network: string; address: string })[];
  type: 'ON' | 'OFF';
  createdAt: number;
  updatedAt: number;
}

export interface RampsQueryParams {
  externalId: string;
  id: string;
  limit: string;
  page: string;
  status: string;
}

export interface RampsQueryResponse {
  ramps: RampsResponse[];
  totalPage: number;
}
