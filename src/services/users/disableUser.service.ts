import { userRepository } from "../../repositories/userRepository";
import { AppError } from "../../errors";

const disableUserService = async (id: string): Promise<void> => {
  const user = await userRepository.findOneBy({ id });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  await userRepository.update(user.id, { is_active: false });
};

export { disableUserService };
