import { cardRepository } from "../../repositories/cardRepository";
import { AppError } from "../../errors";

const unlockCardService = async (id: string): Promise<object> => {
  const card = await cardRepository.findOneBy({ id });

  if (!card) {
    throw new AppError("Card not found", 404);
  }

  await cardRepository.update(card.id, { is_blocked: false });

  return { message: "Card unlocked successfully" };
};

export { unlockCardService };
