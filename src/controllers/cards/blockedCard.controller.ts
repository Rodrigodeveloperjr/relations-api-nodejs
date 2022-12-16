import { blockedCardService } from "../../services/cards/blockedCard.service";
import { Request, Response } from "express";

const blockedCardController = async (req: Request, res: Response) => {
  const id: string = req.params.id;

  await blockedCardService(id);

  return res.status(204).json();
};

export { blockedCardController };
