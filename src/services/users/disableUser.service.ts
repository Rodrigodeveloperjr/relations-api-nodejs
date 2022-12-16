import { AppDataSource } from "../../data-source";
import { User } from "../../entities/users";
import { AppError } from "../../errors";

const disableUserService = async (id: string): Promise<void> => {
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOneBy({ id });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  await userRepository.update(user.id, { isActive: false });
};

export { disableUserService };
