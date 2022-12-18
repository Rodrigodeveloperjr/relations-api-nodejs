import { IAddressRequest } from "../interfaces/address";
import { ICardRequest } from "../interfaces/cards";
import { IPlanRequest } from "../interfaces/plans";
import { IProductRequest } from "../interfaces/products";
import { ISessionRequest } from "../interfaces/session";
import { IUserRequest, IUserUpdateRequest } from "../interfaces/users";

const address: IAddressRequest = {
  country: "United State",
  state: "Califórnia",
  city: "Mountain View",
  district: "Amphitheatre Pkwy",
  road: "Amphitheatre Pkwy",
  number: 1600,
  complement: "Googleplex",
  zipCode: 94043,
};

const user: IUserRequest = {
  name: "example",
  email: "example@org.com.br",
  password: "example@123",
  cpf: "99999999999",
  address: address,
};

const userTwo: IUserRequest = {
  name: "example",
  email: "ex@org.com.br",
  password: "example@123",
  cpf: "99999999990",
  address: address,
};

const updatedUser: IUserUpdateRequest = {
  name: "new_example",
  cpf: "12345678900",
};

const session: ISessionRequest = {
  email: "example@org.com.br",
  password: "example@123",
};

const sessionTwo: ISessionRequest = {
  email: "ex@org.com.br",
  password: "example@123",
};

const invalidSession: ISessionRequest = {
  email: "example@org.com.br",
  password: "example",
};

const card: ICardRequest = {
  cardName: "example",
  cardNumber: "9999 9999 9999 9999",
  expirationDate: "00/00",
  cvc: 999,
  func: "credits and debits",
};

const cardTwo: ICardRequest = {
  cardName: "ex",
  cardNumber: "0000 9999 0000 9999",
  expirationDate: "11/11",
  cvc: 919,
  func: "debits",
};

const plan: IPlanRequest = {
  provider: "Apple",
  planName: "ICloud",
  monthlyPayment: 3.0,
  signatureDate: "11/22",
};

const product: IProductRequest = {
  title: "cap",
  description: "high cap",
  price: 289.0,
  category: "caps",
};

const updatedProduct: IProductRequest = {
  title: "jacket",
  description: "high jacket",
  price: 489.0,
  category: "jackets",
};

export {
  user,
  userTwo,
  updatedUser,
  session,
  sessionTwo,
  invalidSession,
  card,
  cardTwo,
  plan,
  product,
  updatedProduct,
};
