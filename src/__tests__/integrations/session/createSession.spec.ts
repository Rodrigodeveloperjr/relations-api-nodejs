import { invalidSession, session, user } from "../../../mocks"
import { AppDataSource } from "../../../data-source"
import { DataSource } from "typeorm"
import { app } from "../../../app"
import request from "supertest"


describe('Testing session routes', () => {

    let connection: DataSource

    beforeAll(async () => {
        
        await AppDataSource.initialize()
        .then(res => connection = res)
        .catch(err => console.error('Error during Data Source initialization', err))
        
        await request(app).post('/users').send(user)
    })

    afterAll(async () => await connection.destroy())

    it('POST /session -> Must be able to create a session', async () => {

        const response = await request(app).post('/session').send(session)

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('token')
    })
    
    it('POST /session -> Should prevent the creation of a session if the credentials are wrong', async () => {

        const response = await request(app).post('/session').send(invalidSession)

        expect(response.status).toBe(401)
        expect(response.body).toHaveProperty('message')
    })
})
