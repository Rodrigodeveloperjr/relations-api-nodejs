import { userRepository } from "../../repositories/userRepository";
import { AppError } from "../../errors";

const activeUserService = async (id: string): Promise<object> => {
  const user = await userRepository.findOneBy({ id });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  await userRepository.update(user.id, { is_active: true });

  return { message: "User activated successfully" };
};

export { activeUserService };
