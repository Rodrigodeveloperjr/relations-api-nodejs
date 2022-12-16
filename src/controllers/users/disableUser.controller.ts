import { disableUserService } from "../../services/users/disableUser.service";
import { Request, Response } from "express";

const disableUserController = async (req: Request, res: Response) => {
  const id: string = req.params.id;

  await disableUserService(id);

  return res.status(204).json();
};

export { disableUserController };
