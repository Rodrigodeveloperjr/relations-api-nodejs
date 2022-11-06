import { AppDataSource } from "../../../data-source"
import { card, session, user } from "../../mocks"
import { DataSource } from "typeorm"
import { app } from "../../../app"
import request from "supertest"


describe('Testing card routes', () => {

    let connection: DataSource

    beforeAll(async () => {
        
        await AppDataSource.initialize()
        .then(res => connection = res)
        .catch(err => console.error('Error during Data Source initialization', err))
        
        await request(app).post('/users').send(user)
    })

    afterAll(async () => await connection.destroy())

    test('POST /cards -> Must be able to create a new card', async () => {

        const login = await request(app).post('/session').send(session)

        const token = login.body.token
        
        const response = await request(app).post('/cards').send(card).set('Authorization', `Bearer ${token}`)

        expect(response.status).toBe(201)
    
        expect(response.body).toHaveProperty('id')
        expect(response.body).toHaveProperty('card_name')
        expect(response.body).toHaveProperty('card_number')
        expect(response.body).toHaveProperty('expiration_date')
        expect(response.body).toHaveProperty('cvc')
    })
    
    test('POST /cards -> Should prevent to create a card without token', async () => {

        const response = await request(app).post('/cards').send(card)

        expect(response.status).toBe(401)
        expect(response.body).toHaveProperty('message')
    })
})
