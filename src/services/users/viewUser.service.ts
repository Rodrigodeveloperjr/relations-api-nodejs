import { userRepository } from "../../repositories/userRepository";
import { User } from "../../entities/users";

const viewUserService = async (email: string): Promise<User> => {
  const user = await userRepository.findOneBy({ email });

  return user!;
};

export { viewUserService };
