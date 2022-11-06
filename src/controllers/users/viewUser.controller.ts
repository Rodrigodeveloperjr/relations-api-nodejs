import { viewUserService } from "../../services/users/viewUser.service"
import { AppError, handleError } from "../../errors"
import { Request, Response } from "express"


const viewUserController = async (req: Request, res: Response) => {

    try {

        const email: string = req.email

        const view_user = await viewUserService(email)

        return res.json(view_user)
    
    } catch(err) {

        if(err instanceof AppError) {

            handleError(err, res)
        }
    }
}

export { viewUserController }
