import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../data-source";
import { Card } from "../entities/cards";

const isBlockedMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id: string = req.params.id;

  const cardRepository = AppDataSource.getRepository(Card);

  const card = await cardRepository.findOneBy({ id });

  if (card!.isBlocked == true) {
    return res.status(403).json({ message: "Card is blocked" });
  }

  next();
};

export { isBlockedMiddleware };
