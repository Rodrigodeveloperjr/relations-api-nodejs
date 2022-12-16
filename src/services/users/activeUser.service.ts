import { AppDataSource } from "../../data-source";
import { User } from "../../entities/users";
import { AppError } from "../../errors";

const activeUserService = async (id: string): Promise<object> => {
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOneBy({ id });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  await userRepository.update(user.id, { isActive: true });

  return { message: "User activated successfully" };
};

export { activeUserService };
