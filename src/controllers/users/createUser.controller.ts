import { createUserService } from "../../services/users/createUser.service"
import { IUserRequest } from "../../interfaces/users"
import { AppError, handleError } from "../../errors"
import { Request, Response } from "express"


const createUserController = async (req: Request, res: Response) => {

    try  {
        
        const user: IUserRequest = req.body

        const created_user = await createUserService(user)

        return res.status(201).json(created_user)
        
    } catch(err) {

        if(err instanceof AppError) {

            handleError(err, res)
        }
    }
}

export { createUserController }
