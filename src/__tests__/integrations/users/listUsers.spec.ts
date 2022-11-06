import { session, session_two, user, user_two } from "../../../mocks"
import { AppDataSource } from "../../../data-source"
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

    it('GET /users -> Should be able to list multiple users', async () => {

        await request(app).post('/users').send(user)

        const login = await request(app).post('/session').send(session)

        const token = login.body.token
        
        const response = await request(app).get('/users').set('Authorization', `Bearer ${token}`)

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('map')
        expect(response.body).toHaveLength(1)
    })

    it('GET /users -> Should prevent listing users because the user has no token', async () => {

        const response = await request(app).get('/users')

        expect(response.status).toBe(401)
        expect(response.body).toHaveProperty('message')
    })

    it('GET /users -> Should prevent listing users because the user is disabled', async () => {

        const user_response = await request(app).post('/users').send(user_two)

        const login = await request(app).post('/session').send(session_two)

        const token = login.body.token

        await request(app).delete(`/users/${user_response.body.id}`).set('Authorization', `Bearer ${token}`)

        const response = await request(app).get('/users').set('Authorization', `Bearer ${token}`)

        expect(response.status).toBe(403)
        expect(response.body).toHaveProperty('message')
    })
})
