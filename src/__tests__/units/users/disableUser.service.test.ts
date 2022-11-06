import { disableUserService } from "../../../services/users/disableUser.service"
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

    it('Must be able to deactivate a user', async () => {

        const result_user = await createUserService(user)
    
        const result = await disableUserService(result_user.id)

        expect(result).toBeUndefined()
    })
})
