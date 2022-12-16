interface IAddressRequest {
  country: string;
  state: string;
  city: string;
  district: string;
  road: string;
  number: number;
  complement?: string;
  zipCode: number;
}

interface IAddressUpdateRequest {
  country?: string;
  state?: string;
  city?: string;
  district?: string;
  road?: string;
  number?: number;
  complement?: string;
  zipCode?: number;
}

export { IAddressRequest, IAddressUpdateRequest };
