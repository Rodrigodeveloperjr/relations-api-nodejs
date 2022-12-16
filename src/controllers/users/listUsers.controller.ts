import { listUsersService } from "../../services/users/listUsers.service";
import { Request, Response } from "express";

const listUsersController = async (req: Request, res: Response) => {
  const users = await listUsersService();

  return res.json(users);
};

export { listUsersController };
