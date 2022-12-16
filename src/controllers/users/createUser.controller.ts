import { createUserService } from "../../services/users/createUser.service";
import { IUserRequest } from "../../interfaces/users";
import { Request, Response } from "express";

const createUserController = async (req: Request, res: Response) => {
  const user: IUserRequest = req.body;

  const createdUser = await createUserService(user);

  return res.status(201).json(createdUser);
};

export { createUserController };
