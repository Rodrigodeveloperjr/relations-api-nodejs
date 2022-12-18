import { userRepository } from "../../repositories/userRepository";
import { User } from "../../entities/users";

const listUsersService = async (): Promise<User[]> => {
  const users = await userRepository.find();

  return users;
};

export { listUsersService };
