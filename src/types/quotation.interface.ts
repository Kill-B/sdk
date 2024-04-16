export interface QuotationInput {
  fromCurrency: string;
  toCurrency: string;
  amount: number;
  amountIsToCurrency: boolean;
  cashInMethod: 'SPEI' | 'POLYGON' | 'ERC20' | 'PSE' | 'PRE_FUND';
  cashOutMethod: 'SPEI' | 'POLYGON' | 'ERC20' | 'PSE';
}

export interface QuotationResponse {
  id: string;
  fromCurrency: string;
  toCurrency: string;
  fromAmount: number;
  toAmount: number;
  rate: number;
  expiresAt: number;
  cashInMethod: 'SPEI' | 'POLYGON' | 'ERC20' | 'PSE' | 'PRE_FUND';
  cashOutMethod: 'SPEI' | 'POLYGON' | 'ERC20' | 'PSE';
}
