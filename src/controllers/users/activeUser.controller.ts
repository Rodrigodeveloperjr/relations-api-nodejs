import { activeUserService } from "../../services/users/activeUser.service"
import { AppError, handleError } from "../../errors"
import { Request, Response } from "express"


const activeUserController = async (req: Request, res: Response) => {

    try {

        const id: string = req.params.id

        const active_user = await activeUserService(id)

        return res.json(active_user)
    
    } catch(err) {

        if(err instanceof AppError) {

            handleError(err, res)
        }
    }
}

export { activeUserController }
