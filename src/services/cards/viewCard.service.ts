import { AppDataSource } from "../../data-source";
import { Card } from "../../entities/cards";
import { AppError } from "../../errors";

const viewCardService = async (id: string): Promise<Card> => {
  const cardRepository = AppDataSource.getRepository(Card);

  const card = await cardRepository.findOneBy({ id });

  if (!card) {
    throw new AppError("Card not found", 404);
  }

  return card;
};

export { viewCardService };
