import { updateUserService } from "../../services/users/updateUser.service";
import { IUserUpdateRequest } from "../../interfaces/users";
import { Request, Response } from "express";

const updateUserController = async (req: Request, res: Response) => {
  const id: string = req.params.id;

  const user: IUserUpdateRequest = req.body;

  const updatedUser = await updateUserService(user, id);

  return res.json(updatedUser);
};

export { updateUserController };
