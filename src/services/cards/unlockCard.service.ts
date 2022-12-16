import { AppDataSource } from "../../data-source";
import { Card } from "../../entities/cards";
import { AppError } from "../../errors";

const unlockCardService = async (id: string): Promise<object> => {
  const cardRepository = AppDataSource.getRepository(Card);

  const card = await cardRepository.findOneBy({ id });

  if (!card) {
    throw new AppError("Card not found", 404);
  }

  await cardRepository.update(card.id, { isBlocked: false });

  return { message: "Card unlocked successfully" };
};

export { unlockCardService };
