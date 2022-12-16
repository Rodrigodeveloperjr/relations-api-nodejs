import { createPlanService } from "../../services/plans/createPlan.service";
import { IPlanRequest } from "../../interfaces/plans";
import { Request, Response } from "express";

const createPlanController = async (req: Request, res: Response) => {
  const plan: IPlanRequest = req.body;

  const createdPlan = await createPlanService(plan);

  return res.status(201).json(createdPlan);
};

export { createPlanController };
