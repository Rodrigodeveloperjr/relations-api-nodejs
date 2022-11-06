import { AppDataSource } from "../../../data-source"
import { card, session, user } from "../../../mocks"
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

    it('GET /cards/:id -> Must be able to view card', async () => {

        const login = await request(app).post('/session').send(session)

        const token = login.body.token
        
        const card_response = await request(app).post('/cards').send(card).set('Authorization', `Bearer ${token}`)

        const response = await request(app).get(`/cards/${card_response.body.id}`).set('Authorization', `Bearer ${token}`)

        expect(response.status).toBe(200)
        
        expect(response.body).toHaveProperty('id')
        expect(response.body).toHaveProperty('card_name')
        expect(response.body).toHaveProperty('card_number')
        expect(response.body).toHaveProperty('expiration_date')
        expect(response.body).toHaveProperty('cvc')
    })
    
    it('GET /cards/:id -> Should avoid seeing a card without a token', async () => {

        const card_response = await request(app).post('/cards').send(card)

        const response = await request(app).get(`/cards/${card_response.body.id}`)

        expect(response.status).toBe(401)
        expect(response.body).toHaveProperty('message')
    })

    it('GET /cards/:id -> Should avoid seeing a blocked card', async () => {

        const login = await request(app).post('/session').send(session)

        const token = login.body.token

        const card_response = await request(app).post('/cards').send(card).set('Authorization', `Bearer ${token}`)

        await request(app).delete(`/cards/${card_response.body.id}`).set('Authorization', `Bearer ${token}`)

        const response = await request(app).get(`/cards/${card_response.body.id}`).set('Authorization', `Bearer ${token}`)

        expect(response.status).toBe(403)
        expect(response.body).toHaveProperty('message')
    })
    /*
    test('GET /cards/:id -> Should prevent seeing non-existent card', async () => {
        
        const login = await request(app).post('/login').send(session)

        const token = login.body.token

        const response = await request(app).get('/cards/1').set('Authorization', `Bearer ${token}`)

        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty('message')
    })
    */
})
