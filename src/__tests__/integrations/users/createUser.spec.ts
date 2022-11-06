import { AppDataSource } from "../../../data-source"
import { DataSource } from "typeorm"
import { app } from "../../../app"
import { user } from "../../../mocks"
import request from "supertest"


describe('Testing user routes', () => {

    let connection: DataSource

    beforeAll(async () => {
        
        await AppDataSource.initialize()
        .then(res => connection = res)
        .catch(err => console.error('Error during Data Source initialization', err))
    })

    afterAll(async () => await connection.destroy())

    it('POST /users -> Must be able to create a new user', async () => {
        
        const response = await request(app).post('/users').send(user)

        expect(response.status).toBe(201)
        
        expect(response.body).toHaveProperty('name')
        expect(response.body).toHaveProperty('email')
        expect(response.body).toHaveProperty('password')
        expect(response.body).toHaveProperty('cpf')
        expect(response.body).toHaveProperty('address')
        expect(response.body).toHaveProperty('is_active')
        expect(response.body).toHaveProperty('created_at')
        expect(response.body).toHaveProperty('updated_at')
    })
    
    it('POST /users -> Should prevent creating a new user with already existing email', async () => {
        
        const response = await request(app).post('/users').send(user)

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('message')
    })

    it('POST /users -> Should prevent creating a new user with already existing cpf', async () => {
        
        user.email = 'example2@org.com.br'

        const response = await request(app).post('/users').send(user)

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('message')
    })
})
