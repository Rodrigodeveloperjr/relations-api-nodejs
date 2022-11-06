import { ISessionRequest } from "../../interfaces/session"
import { AppDataSource } from "../../data-source"
import { User } from "../../entities/users"
import { AppError } from "../../errors"
import { compare } from "bcrypt"
import jwt from "jsonwebtoken"


const createSessionService = async ({ email, password }: ISessionRequest): Promise<object> => {

    const userRepository = AppDataSource.getRepository(User)

    const user = await userRepository.findOneBy({ email })

    const password_match = await compare(password, user!.password)

    if(!password_match) {

        throw new AppError('Invalid user or password', 401)
    }

    const token = jwt.sign({ email: email }, process.env.SECRET_KEY as string, { expiresIn: '1h', subject: user!.id })

    return { token: token }
}

export { createSessionService }
