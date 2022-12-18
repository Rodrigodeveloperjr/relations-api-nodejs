import { cardRepository } from "../repositories/cardRepository";
import { Request, Response, NextFunction } from "express";

const isBlockedMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id: string = req.params.id;

  const card = await cardRepository.findOneBy({ id });

  if (card!.isBlocked == true) {
    return res.status(403).json({ message: "Card is blocked" });
  }

  next();
};

export { isBlockedMiddleware };
