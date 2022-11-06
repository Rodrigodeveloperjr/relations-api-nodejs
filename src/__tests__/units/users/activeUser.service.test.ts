import { activeUserService } from "../../../services/users/activeUser.service"
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

    test('Must be able to activate a user', async () => {

        const result_user = await createUserService(user)
    
        const result = await activeUserService(result_user.id)

        expect(result).toHaveProperty('message')
    })
})
