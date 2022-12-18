import { cardRepository } from "../../repositories/cardRepository";
import { ICardRequest } from "../../interfaces/cards";
import { Card } from "../../entities/cards";

const createCardService = async (card: ICardRequest): Promise<Card> => {
  const newCard = new Card();
  newCard.card_name = card.cardName;
  newCard.card_number = card.cardNumber;
  newCard.expiration_date = card.expirationDate;
  newCard.cvc = card.cvc;
  newCard.func = card.func;

  cardRepository.create(newCard);
  await cardRepository.save(newCard);

  return newCard;
};

export { createCardService };
