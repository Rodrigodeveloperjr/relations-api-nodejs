import { IAddressRequest, IAddressUpdateRequest } from "../address";

interface IUserRequest {
  name: string;
  email: string;
  password: string;
  cpf: string;
  address: IAddressRequest;
}

interface IUserUpdateRequest {
  name?: string;
  email?: string;
  password?: string;
  cpf?: string;
  address?: IAddressUpdateRequest;
}

interface IUserResponse extends IUserRequest {
  id: string;
}

export { IUserRequest, IUserUpdateRequest, IUserResponse };
