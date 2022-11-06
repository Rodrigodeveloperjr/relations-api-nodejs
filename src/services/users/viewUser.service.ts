import { AppDataSource } from "../../data-source"
import { User } from "../../entities/users"


const viewUserService = async (email: string): Promise<User> => {

    const userRepository = AppDataSource.getRepository(User)

    const user = await userRepository.findOneBy({ email })

    return user!
}

export { viewUserService }
