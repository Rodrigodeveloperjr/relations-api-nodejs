import { blockedCardService } from "../../services/cards/blockedCard.service"
import { AppError, handleError } from "../../errors"
import { Request, Response } from "express"


const blockedCardController = async (req: Request, res: Response) => {

    try {

        const id: string = req.params.id
        
        await blockedCardService(id)

        return res.status(204).json()

    } catch(err) {

        if(err instanceof AppError) {

            handleError(err, res)
        }
    }
}

export { blockedCardController }
