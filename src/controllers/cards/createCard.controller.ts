import { createCardService } from "../../services/cards/createCard.service"
import { ICardRequest } from "../../interfaces/cards"
import { AppError, handleError } from "../../errors"
import { Request, Response } from "express"


const createCardController = async (req: Request, res: Response) => {

    try {

        const card: ICardRequest = req.body

        const new_card = await createCardService(card)

        return res.status(201).json(new_card)

    } catch(err) {

        if(err instanceof AppError) {

            handleError(err, res)
        }
    }
}

export { createCardController }
