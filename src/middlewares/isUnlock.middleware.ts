import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../data-source";
import { Card } from "../entities/cards";

const isUnlockMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id: string = req.params.id;

  const cardRepository = AppDataSource.getRepository(Card);

  const card = await cardRepository.findOneBy({ id });

  if (card!.isBlocked == false) {
    return res.status(403).json({ message: "Card is already unlock" });
  }

  next();
};

export { isUnlockMiddleware };
