import { AppDataSource } from "../../../data-source"
import { plan, session, user } from "../../../mocks"
import { DataSource } from "typeorm"
import { app } from "../../../app"
import request from "supertest"


describe('Testing plan routes', () => {

    let connection: DataSource

    beforeAll(async () => {

        await AppDataSource.initialize()
        .then(res => connection = res)
        .catch(err => console.error('Error during Data Source initialization', err))
        
        await request(app).post('/users').send(user)
    })

    afterAll(async () => await connection.destroy())

    it('POST /plans -> Must be able to create a new plan', async () => {

        const login = await request(app).post('/session').send(session)

        const token = login.body.token
        
        const response = await request(app).post('/plans').send(plan).set('Authorization', `Bearer ${token}`)

        expect(response.status).toBe(201)
    
        expect(response.body).toHaveProperty('id')
        expect(response.body).toHaveProperty('provider')
        expect(response.body).toHaveProperty('planName')
        expect(response.body).toHaveProperty('monthlyPayment')
        expect(response.body).toHaveProperty('signatureDate')
    })
    
    it('POST /plans -> Should prevent to create a plan without token', async () => {

        const response = await request(app).post('/plans').send(plan)

        expect(response.status).toBe(401)
        expect(response.body).toHaveProperty('message')
    })
})
