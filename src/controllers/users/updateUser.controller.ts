import { updateUserService } from "../../services/users/updateUser.service"
import { IUserUpdateRequest } from "../../interfaces/users"
import { AppError, handleError } from "../../errors"
import { Request, Response } from "express"


const updateUserController = async (req: Request, res: Response) => {

   try {

        const id: string = req.params.id

        const user: IUserUpdateRequest = req.body

        const updated_user = await updateUserService(user, id)

        return res.json(updated_user)
  
    } catch(err) {

        if(err instanceof AppError) {

            handleError(err, res)
        }
    }
}

export { updateUserController }
