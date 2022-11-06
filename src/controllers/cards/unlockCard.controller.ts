import { unlockCardService } from "../../services/cards/unlockCard.service"
import { AppError, handleError } from "../../errors"
import { Request, Response } from "express"


const unlockCardController = async (req: Request, res: Response) => {

    try {

        const id: string = req.params.id
        
        const unlock_card = await unlockCardService(id)

        return res.json(unlock_card)

    } catch(err) {

        if(err instanceof AppError) {

            handleError(err, res)
        }
    }
}

export { unlockCardController }
