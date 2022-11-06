import { listUsersService } from "../../services/users/listUsers.service"
import { AppError, handleError } from "../../errors"
import { Request, Response } from "express"


const listUsersController = async (req: Request, res: Response) => {

    try {
        
        const users = await listUsersService()

        return res.json(users)
    
    } catch(err) {

        if(err instanceof AppError) {

            handleError(err, res)
        }
    }
}

export { listUsersController }
