import { IUserRequest } from "../../interfaces/users"
import { AppDataSource } from "../../data-source"
import { Address } from "../../entities/address"
import { User } from "../../entities/users"
import { AppError } from "../../errors"
import { hash } from "bcrypt"


const createUserService = async ({ name, email, password, cpf, address }: IUserRequest): Promise<User> => {

    const userRepository = AppDataSource.getRepository(User)

    const addressRepository = AppDataSource.getRepository(Address)

    if(await userRepository.findOneBy({ email })) {

        throw new AppError('Email already exists')
    }

    if(await userRepository.findOneBy({ cpf })) {

        throw new AppError('Cpf already exists')
    }

    const hashed_password = await hash(password, 10)

    addressRepository.create(address)
    const new_address = await addressRepository.save(address)

    const user = new User()
    user.name = name
    user.email = email
    user.password = hashed_password
    user.cpf = cpf
    user.address = new_address
    user.created_at = new Date()
    user.updated_at = new Date()

    userRepository.create(user)
    await userRepository.save(user)

    return user
}

export { createUserService }
