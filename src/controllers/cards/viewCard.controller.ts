import { viewCardService } from "../../services/cards/viewCard.service"
import { AppError, handleError } from "../../errors"
import { Request, Response } from "express"


const viewCardController = async (req: Request, res: Response) => {

    try {

        const id: string = req.params.id

        const view_card = await viewCardService(id)

        return res.json(view_card)

    } catch(err) {

        if(err instanceof AppError) {

            handleError(err, res)
        }
    }
}

export { viewCardController }
