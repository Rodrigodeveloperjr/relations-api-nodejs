interface ICardRequest {
  cardName: string;
  cardNumber: string;
  expirationDate: string;
  cvc: number;
  func?: string;
}

export { ICardRequest };
