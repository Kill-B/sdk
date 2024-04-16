import { PersonDocument, CompanyDocument } from './documents.interface';


export interface PSEAccountInput {
  type: 'PSE';
  userId: string;
  data: {
    firstName?: string;
    middleName?: string;
    lastName?: string;
    companyName?: string;
    email: string;
    phone: string;
    accountNumber: string;
    bankCode: string;
    type: string;
    countryCode: string;
    document: PersonDocument | CompanyDocument;
  };
  externalId?: string;
}


export interface SPEIAccountInput {
  type: 'SPEI';
  userId: string;
  data: {
    firstName?: string;
    middleName?: string;
    lastName?: string;
    companyName?: string;
    email: string;
    phone: string;
    clabe: string;
    clabeType: string;
    bankCode: string;
    countryCode: string;
    document: PersonDocument | CompanyDocument;
  };
  externalId?: string;
}

export interface WalletAccountInput {
  type: 'WALLET';
  userId: string;
  data: {
    firstName?: string;
    middleName?: string;
    lastName?: string;
    companyName?: string;
    email: string;
    phone: string;
    currency: string;
    network: string;
    address: string;
    document: PersonDocument | CompanyDocument;
  };
  externalId?: string;
}

export type AccountInput = PSEAccountInput | SPEIAccountInput | WalletAccountInput;

export interface PSEAccountResponse {
  id: string;
  type: 'PSE';
  data: {
    firstName?: string;
    middleName?: string;
    lastName?: string;
    companyName?: string;
    email: string;
    phone: string;
    accountNumber: string;
    bankCode: string;
    type: string;
    countryCode: string;
    document: PersonDocument | CompanyDocument;
  };
  externalId?: string;
  userId: string;
  createdAt: string;
  updatedAt: string;

}

export interface SPEIAccountResponse {
  id: string;
  type: 'SPEI';
  data: {
    firstName?: string;
    middleName?: string;
    lastName?: string;
    companyName?: string;
    email: string;
    phone: string;
    clabe: string;
    clabeType: string;
    bankCode: string;
    countryCode: string;
    document: PersonDocument | CompanyDocument;
  };
  externalId?: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface WalletAccountResponse {
  id: string;
  type: 'WALLET';
  data: {
    firstName?: string;
    middleName?: string;
    lastName?: string;
    companyName?: string;
    email: string;
    phone: string;
    currency: string;
    network: string;
    address: string;
    document: PersonDocument | CompanyDocument;
  };
  externalId?: string;
  userId: string;
  createdAt: string;
  updatedAt: string;

}

export type AccountResponse = PSEAccountResponse | SPEIAccountResponse | WalletAccountResponse;



export interface SPEAccountUpdateInput {
  type: 'SPEI';
  data: {
    clabe: string;
    clabeType: string;
    document: PersonDocument | CompanyDocument;
  };
}

export interface PSEAccountUpdateInput {
  type: 'PSE';
  data: {
    accountNumber: string;
    bankCode: string;
    type: string;
    document: PersonDocument | CompanyDocument;
  };
}

export interface WalletAccountUpdateInput {
  type: 'WALLET';
  data: {
    currency: string;
    network: string;
    address: string;
    document: PersonDocument | CompanyDocument;
  };
}

export type AccountUpdateInput = PSEAccountUpdateInput | SPEAccountUpdateInput | WalletAccountUpdateInput;


export interface BankResponse {
  code: string;
  companyName: string;
  countryCode: string;
  tradeName: string;
  updatedAt: string;
  createdAt: string;
  accountTypes: string;
  id: string;
}
