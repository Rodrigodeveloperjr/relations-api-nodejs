import { addressRepository } from "../../repositories/addressRepository";
import { userRepository } from "../../repositories/userRepository";
import { IUserRequest } from "../../interfaces/users";
import { User } from "../../entities/users";
import { AppError } from "../../errors";
import { hash } from "bcrypt";

const createUserService = async (user: IUserRequest): Promise<User> => {
  if (await userRepository.findOneBy({ email: user.email })) {
    throw new AppError("Email already exists");
  }

  if (await userRepository.findOneBy({ cpf: user.cpf })) {
    throw new AppError("Cpf already exists");
  }

  const hashedPassword = await hash(user.password, 10);

  addressRepository.create(user.address);
  const newAddress = await addressRepository.save(user.address);

  const newUser = new User();
  newUser.name = user.name;
  newUser.email = user.email;
  newUser.password = hashedPassword;
  newUser.cpf = user.cpf;
  newUser.address = newAddress;

  userRepository.create(newUser);
  await userRepository.save(newUser);

  return newUser;
};

export { createUserService };
