import { AppDataSource } from "../../data-source"
import { User } from "../../entities/users"


const disableUserService = async (id: string): Promise<void> => {

    const userRepository = AppDataSource.getRepository(User)

    await userRepository.update(id, { is_active: false })
}

export { disableUserService }
