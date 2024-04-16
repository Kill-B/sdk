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
