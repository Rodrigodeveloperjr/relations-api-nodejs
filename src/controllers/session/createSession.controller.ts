import { createSessionService } from "../../services/session/createSession.service"
import { ISessionRequest } from "../../interfaces/session"
import { AppError, handleError } from "../../errors"
import { Request, Response } from "express"


const createSessionController = async (req: Request, res: Response) => {

    try {

        const data: ISessionRequest = req.body

        const token = await createSessionService(data)

        return res.json(token)
    
    } catch(err) {

        if(err instanceof AppError) {

            handleError(err, res)
        }
    }
}

export { createSessionController }
