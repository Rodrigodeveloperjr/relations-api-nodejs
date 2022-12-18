import { userRepository } from "../repositories/userRepository";
import { Request, Response, NextFunction } from "express";

const isActiveMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const email: string = req.email;

  const user = await userRepository.findOneBy({ email });

  if (!user!.is_adm) {
    return res.status(403).json({ message: "This user is not an admin" });
  }

  next();
};

export { isActiveMiddleware };
