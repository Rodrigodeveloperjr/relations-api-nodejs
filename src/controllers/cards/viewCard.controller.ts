import { viewCardService } from "../../services/cards/viewCard.service";
import { Request, Response } from "express";

const viewCardController = async (req: Request, res: Response) => {
  const id: string = req.params.id;

  const viewCard = await viewCardService(id);

  return res.json(viewCard);
};

export { viewCardController };
