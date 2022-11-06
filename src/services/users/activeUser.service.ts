import { AppDataSource } from "../../data-source"
import { User } from "../../entities/users"


const activeUserService = async (id: string): Promise<object> => {

    const userRepository = AppDataSource.getRepository(User)
    
    await userRepository.update(id, { is_active: true })

    return { message: 'User activated successfully' }
}

export { activeUserService }
