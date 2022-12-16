import { ISessionRequest } from "../../interfaces/session";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities/users";
import { AppError } from "../../errors";
import { compare } from "bcrypt";
import jwt from "jsonwebtoken";

const createSessionService = async (
  session: ISessionRequest
): Promise<object> => {
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOneBy({ email: session.email });

  if (!user) {
    throw new AppError("Invalid user or password", 401);
  }
  
  const passwordMatch = await compare(session.password, user!.password);

  if (!passwordMatch) {
    throw new AppError("Invalid user or password", 401);
  }

  const token = jwt.sign(
    { email: user.email },
    process.env.SECRET_KEY as string,
    { expiresIn: "24h", subject: user.id }
  );

  return { token };
};

export { createSessionService };
