import { createPlanService } from "../../services/plans/createPlan.service"
import { IPlanRequest } from "../../interfaces/plans"
import { AppError, handleError } from "../../errors"
import { Request, Response } from "express"


const createPlanController = async (req: Request, res: Response) => {

    try {

        const plan: IPlanRequest = req.body

        const created_plan = await createPlanService(plan)

        return res.status(201).json(created_plan)
        
    } catch(err) {

        if(err instanceof AppError) {

            handleError(err, res)
        }
    }
}

export { createPlanController }
