import { userRepository } from "../../repositories/userRepository";
import { IUserUpdateRequest } from "../../interfaces/users";
import { User } from "../../entities/users";
import { AppError } from "../../errors";
import { hash } from "bcrypt";

const updateUserService = async (
  user: IUserUpdateRequest,
  id: string
): Promise<User> => {
  const findUser = await userRepository.findOneBy({ id });

  if (!findUser) {
    throw new AppError("User not found", 404);
  }

  await userRepository.update(id, {
    name: user.name ? user.name : findUser.name,
    email: user.email ? user.email : findUser.email,
    password: user.password ? await hash(user.password, 10) : findUser.password,
    cpf: user.cpf ? user.cpf : findUser.cpf,
    address: user.address ? user.address : findUser.address,
  });

  const updatedUser = await userRepository.findOneBy({ id });

  return updatedUser!;
};

export { updateUserService };
