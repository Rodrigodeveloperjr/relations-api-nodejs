import { cardRepository } from "../../repositories/cardRepository";
import { AppError } from "../../errors";

const blockedCardService = async (id: string): Promise<void> => {
  const card = await cardRepository.findOneBy({ id });

  if (!card) {
    throw new AppError("Card not found", 404);
  }

  await cardRepository.update(card.id, { is_blocked: true });
};

export { blockedCardService };
