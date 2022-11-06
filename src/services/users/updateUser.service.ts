import { IUserUpdateRequest } from "../../interfaces/users"
import { AppDataSource } from "../../data-source"
import { User } from "../../entities/users"
import { hash } from "bcrypt"


const updateUserService = async ({ name, email, password, cpf, address }: IUserUpdateRequest, id: string): Promise<User> => {

    const userRepository = AppDataSource.getRepository(User)

    const find_user = await userRepository.findOneBy({ id })

    await userRepository.update(id, {
        name: name ? name : find_user!.name,
        email: email ? email : find_user!.email,
        password: password ? await hash(password, 10) : find_user!.password,
        cpf: cpf ? cpf : find_user!.cpf,
        address: address ? address : find_user!.address
    })

    const user = await userRepository.findOneBy({ id })

    return user!
}

export { updateUserService }
