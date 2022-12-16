import { createCardService } from "../../services/cards/createCard.service";
import { ICardRequest } from "../../interfaces/cards";
import { Request, Response } from "express";

const createCardController = async (req: Request, res: Response) => {
  const card: ICardRequest = req.body;

  const newCard = await createCardService(card);

  return res.status(201).json(newCard);
};

export { createCardController };
