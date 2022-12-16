import { viewUserService } from "../../services/users/viewUser.service";
import { Request, Response } from "express";

const viewUserController = async (req: Request, res: Response) => {
  const email: string = req.email;

  const viewUser = await viewUserService(email);

  return res.json(viewUser);
};

export { viewUserController };
