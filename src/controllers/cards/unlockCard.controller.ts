import { unlockCardService } from "../../services/cards/unlockCard.service";
import { Request, Response } from "express";

const unlockCardController = async (req: Request, res: Response) => {
  const id: string = req.params.id;

  const unlockCard = await unlockCardService(id);

  return res.json(unlockCard);
};

export { unlockCardController };
