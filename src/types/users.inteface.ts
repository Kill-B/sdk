export interface Address {
  street1:  string;
  street2?: string;
  city: string;
  state: string;
  zipCode: string;
  countryCode: string;
}

export interface PersonDocument {
  type: 'PASSPORT' | 'DRIVER_LICENSE' | 'NUIP' | 'RFC' | 'SSN' | 'CURP' | 'CPF' | 'INE' | 'IFE';
  number: string;
  issuedCountryCode: string;
  expeditionDate?: string;
  cic?: string;
  identificadorCiudadano?: string;
  ocr?: string;
  numeroEmision?: string;
}

export interface CompanyDocument {
  type: 'NIT' | 'EIN' | 'CNPJ';
  number: string;
  issuedCountryCode: string;
}

export interface PersonUserInput {
  type: 'PERSON';
  data: {
    firstName: string;
    middleName?: string;
    lastName: string;
    dateOfBirth: string;
    email: string;
    phone: string;
    address: Address;
    document: PersonDocument;
  };
  externalId?: string;
}

export interface CompanyUserInput {
  type: 'COMPANY';
  data: {
    companyName: string;
    tradeName?: string;
    legalStructure?: string;
    description?: string;
    establishedOn?: string;
    email?: string;
    phone?: string;
    mainOwnerUser: string;
    ownerUsers?: string[];
    naics?: string;
    naicsDescription?: string;
    address: Address;
    document: CompanyDocument;
  };
  externalId?: string;
}

export type UserInput  = PersonUserInput | CompanyUserInput;


export interface PersonUserResponse {
  id: string;
  customerId: string;
  type: 'PERSON';
  data: {
    firstName: string;
    middleName?: string;
    lastName: string;
    dateOfBirth: string;
    email: string;
    phone: string;
    address: Address;
    document: {
      type: 'PASSPORT' | 'DRIVER_LICENSE' | 'NUIP' | 'RFC' | 'SSN' | 'CURP' | 'CPF' | 'INE' | 'IFE';
      number: string;
      issuedCountryCode: string;
      expeditionDate?: string;
      cic?: string;
      identificadorCiudadano?: string;
      ocr?: string;
      numeroEmision?: string;
    }
  }
  externalId?: string;
  accessLevel: 'L0' | 'L1' | 'L2' | 'L3' | 'L4';
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CompanyUserResponse {
  id: string;
  customerId: string;
  type: 'COMPANY';
  data: {
    companyName: string;
    tradeName?: string;
    legalStructure?: string;
    description?: string;
    establishedOn?: string;
    email: string;
    phone: string;
    address: Address;
    mainOwnerUser: string;
    ownerUsers?: string[];
    naics: string;
    naicsDescription: string;
    document: CompanyDocument;
  }
  externalId?: string;
  accessLevel: 'L0' | 'L1' | 'L2' | 'L3' | 'L4';
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export type CreateUserResponse = PersonUserResponse | CompanyUserResponse;

export type UserResponse = PersonUserResponse | CompanyUserResponse;

export interface GetUserQueryParams {
  companyName?: string;
  dateOfBirth?: string;
  description?: string;
  email?: string;
  establishedOn?: string;
  externalId?: string;
  firstName?: string;
  id?: string;
  legalStructure?: string;
  limit?: number;
  mainOwnerUser?: string;
  middleName?: string;
  naics?: string;
  naicsDescription?: string;
  ownerUsers?: string[];
  page?: number;
  phone?: string;
  tradeName?: string;
}

export interface UserQueryResponse {
  users: UserResponse[];
  totalPage: number;
}
