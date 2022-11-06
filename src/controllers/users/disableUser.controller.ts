import { disableUserService } from "../../services/users/disableUser.service"
import { AppError, handleError } from "../../errors"
import { Request, Response } from "express"


const disableUserController = async (req: Request, res: Response) => {

    try {

        const id: string = req.params.id

        await disableUserService(id)

        return res.status(204).json()
    
    } catch(err) {

        if(err instanceof AppError) {

            handleError(err, res)
        }
    }
}

export { disableUserController }
