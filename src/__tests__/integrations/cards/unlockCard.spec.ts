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

    test('POST /cards/:id -> Must be able to unlock card', async () => {

        const login = await request(app).post('/session').send(session)

        const token = login.body.token
        
        const card_response = await request(app).post('/cards').send(card).set('Authorization', `Bearer ${token}`)

        await request(app).delete(`/cards/${card_response.body.id}`).send(card).set('Authorization', `Bearer ${token}`)
        
        const response = await request(app).post(`/cards/${card_response.body.id}`).set('Authorization', `Bearer ${token}`)

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('message')
    })
    
    test('POST /cards/:id -> Should avoid unlocking a card without a token', async () => {

        const card_response = await request(app).post('/cards').send(card)

        const response = await request(app).post(`/cards/${card_response.body.id}`)

        expect(response.status).toBe(401)
        expect(response.body).toHaveProperty('message')
    })
    
    test('POST /cards/:id -> Must prevent unlocking card already unlock', async () => {
        
        const login = await request(app).post('/session').send(session)

        const token = login.body.token

        const card_response = await request(app).post('/cards').send(card).set('Authorization', `Bearer ${token}`)

        const response = await request(app).post(`/cards/${card_response.body.id}`).set('Authorization', `Bearer ${token}`)

        expect(response.status).toBe(403)
        expect(response.body).toHaveProperty('message')
    })
    /*
    test('POST /cards/:id -> Should prevent unlocking non-existent card', async () => {
        
        const login = await request(app).post('/login').send(session)

        const token = login.body.token

        const response = await request(app).post('/cards/1').set('Authorization', `Bearer ${token}`)

        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty('message')
    })
    */
})
