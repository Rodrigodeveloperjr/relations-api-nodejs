import { ICardRequest } from "../../interfaces/cards";
import { AppDataSource } from "../../data-source";
import { Card } from "../../entities/cards";

const createCardService = async (card: ICardRequest): Promise<Card> => {
  const cardRepository = AppDataSource.getRepository(Card);

  const newCard = new Card();
  newCard.cardName = card.cardName;
  newCard.cardNumber = card.cardNumber;
  newCard.expirationDate = card.expirationDate;
  newCard.cvc = card.cvc;
  newCard.func = card.func;

  cardRepository.create(newCard);
  await cardRepository.save(newCard);

  return newCard;
};

export { createCardService };
