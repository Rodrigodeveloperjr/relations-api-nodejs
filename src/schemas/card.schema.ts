import { ICardRequest } from "../interfaces/cards";
import { SchemaOf } from "yup";
import * as yup from "yup";

const cardSchema: SchemaOf<ICardRequest> = yup.object().shape({
  cardName: yup.string().required("card_name required"),
  cardNumber: yup.string().required("card_number required"),
  expirationDate: yup.string().required("expiration_card required"),
  cvc: yup.number().required("cvc required"),
  func: yup.string(),
});

export { cardSchema };
