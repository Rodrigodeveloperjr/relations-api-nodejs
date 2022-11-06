import { AppDataSource } from "../../../data-source"
import { session, user } from "../../../mocks"
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

    it('POST /users/:id -> Must be able to activate a user', async () => {

        const user_response = await request(app).post('/users').send(user)

        const login = await request(app).post('/session').send(session)

        const token = login.body.token
        
        await request(app).delete(`/users/${user_response.body.id}`).set('Authorization', `Bearer ${token}`)
        
        const response = await request(app).post(`/users/${user_response.body.id}`).set('Authorization', `Bearer ${token}`)

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('message')
    })

    it('POST /users/:id -> Should prevent activation of a user without token', async () => {

        const user_response = await request(app).post('/users').send(user)
        
        const response = await request(app).post(`/users/${user_response.body.id}`)

        expect(response.status).toBe(401)
        expect(response.body).toHaveProperty('message')
    })
    
    it('POST /users/:id -> Should prevent activation of an already activated user', async () => {

        const user_response = await request(app).post('/users').send(user)

        await request(app).post(`/users/${user_response.body.id}`)

        const login = await request(app).post('/session').send(session)

        const token = login.body.token
        
        const response = await request(app).post(`/users/${user_response.body.id}`).set('Authorization', `Bearer ${token}`)

        expect(response.status).toBe(403)
        expect(response.body).toHaveProperty('message')
    })
    /*
    test('POST /users/:id -> Should prevent activation of a non-existent user', async () => {

        await request(app).post('/users').send(user_two)

        const login = await request(app).post('/session').send(session_two)

        const token = login.body.token
        
        const response = await request(app).post('/users/1').set('Authorization', `Bearer ${token}`)

        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty('message')
    })
    */
})
