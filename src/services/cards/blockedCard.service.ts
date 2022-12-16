import { AppDataSource } from "../../data-source";
import { Card } from "../../entities/cards";
import { AppError } from "../../errors";

const blockedCardService = async (id: string): Promise<void> => {
  const cardRepository = AppDataSource.getRepository(Card);

  const card = await cardRepository.findOneBy({ id });

  if (!card) {
    throw new AppError("Card not found", 404);
  }

  await cardRepository.update(card.id, { isBlocked: true });
};

export { blockedCardService };
