import { Request, Response, NextFunction } from "express"
import { AppDataSource } from "../data-source"
import { User } from "../entities/users"


const isDisableMiddleware = async (req: Request, res: Response, next: NextFunction) => {

    const email: string = req.email

    const userRepository = AppDataSource.getRepository(User)

    const user = await userRepository.findOneBy({ email })

    if(user!.is_active == false) {

        return res.status(403).json({ message: 'User is disabled' })
    }

    next()
}

export { isDisableMiddleware }
