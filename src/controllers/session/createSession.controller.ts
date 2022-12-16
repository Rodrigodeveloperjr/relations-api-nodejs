import { createSessionService } from "../../services/session/createSession.service"
import { ISessionRequest } from "../../interfaces/session"
import { Request, Response } from "express"


const createSessionController = async (req: Request, res: Response) => {

    const data: ISessionRequest = req.body

    const token = await createSessionService(data)

    return res.json(token)
}

export { createSessionController }
