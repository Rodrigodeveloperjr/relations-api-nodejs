import { AppDataSource } from "../../../data-source"
import { session, user } from "../../mocks"
import { DataSource } from "typeorm"
import { app } from "../../../app"
import request from "supertest"


describe('Testing user routes', () => {

    let connection: DataSource

    beforeAll(async () => {
        
        await AppDataSource.initialize()
        .then(res => connection = res)
        .catch(err => console.error('Error during Data Source initialization', err))
    })

    afterAll(async () => await connection.destroy())

    it('GET /users/profile -> Must be able to see a user', async () => {

        await request(app).post('/users').send(user)

        const login = await request(app).post('/session').send(session)

        const token = login.body.token
        
        const response = await request(app).get('/users/profile').set('Authorization', `Bearer ${token}`)

        expect(response.status).toBe(200)
        
        expect(response.body).toHaveProperty('name')
        expect(response.body).toHaveProperty('email')
        expect(response.body).toHaveProperty('password')
        expect(response.body).toHaveProperty('cpf')
        expect(response.body).toHaveProperty('address')
        expect(response.body).toHaveProperty('is_active')
        expect(response.body).toHaveProperty('created_at')
        expect(response.body).toHaveProperty('updated_at')
        expect(response.body).toHaveProperty('plan')
        expect(response.body).toHaveProperty('cards')
        expect(response.body).toHaveProperty('products')
    })

    it('GET /users/profile -> Should prevent seeing a user without token', async () => {
        
        const response = await request(app).get('/users/profile/')

        expect(response.status).toBe(401)
        expect(response.body).toHaveProperty('message')
    })
})
