import { activeUserService } from "../../services/users/activeUser.service";
import { Request, Response } from "express";

const activeUserController = async (req: Request, res: Response) => {
  const id: string = req.params.id;

  const activeUser = await activeUserService(id);

  return res.json(activeUser);
};

export { activeUserController };
