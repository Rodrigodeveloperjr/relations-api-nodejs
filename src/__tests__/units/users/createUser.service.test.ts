import { createUserService } from "../../../services/users/createUser.service"
import { AppDataSource } from "../../../data-source"
import { DataSource } from "typeorm"
import { user } from "../../mocks"


describe('Tests for user service', () => {

    let connection: DataSource

    beforeAll(async () => {
        
        await AppDataSource.initialize()
        .then(res => connection = res)
        .catch(err => console.error('Error during Data Source initialization', err))
    })

    afterAll(async () => await connection.destroy())

    it('Must be able to create a new user', async () => {
    
        const result = await createUserService(user)

        expect(result).toHaveProperty('id')
        expect(result).toHaveProperty('name')
        expect(result).toHaveProperty('email')
        expect(result).toHaveProperty('password')
        expect(result).toHaveProperty('cpf')
        expect(result).toHaveProperty('address')
        expect(result).toHaveProperty('is_active')
        expect(result).toHaveProperty('created_at')
        expect(result).toHaveProperty('updated_at')
    })
})
