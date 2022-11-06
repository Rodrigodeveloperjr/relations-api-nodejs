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

    it('DELETE /users/:id -> Must be able to deactivate a user', async () => {

        const user_response = await request(app).post('/users').send(user)

        const login = await request(app).post('/session').send(session)

        const token = login.body.token
        
        const response = await request(app).delete(`/users/${user_response.body.id}`).set('Authorization', `Bearer ${token}`)

        expect(response.status).toBe(204)
    })

    it('DELETE /users/:id -> Should prevent deactivating a user without token', async () => {

        const user_response = await request(app).post('/users').send(user)
        
        const response = await request(app).delete(`/users/${user_response.body.id}`)

        expect(response.status).toBe(401)
        expect(response.body).toHaveProperty('message')
    })

    it('DELETE /users/:id -> Should be prevent deactivating an already deactivated user', async () => {

        const user_response = await request(app).post('/users').send(user)

        const login = await request(app).post('/session').send(session)

        const token = login.body.token
        
        await request(app).delete(`/users/${user_response.body.id}`).set('Authorization', `Bearer ${token}`)
        
        const response = await request(app).delete(`/users/${user_response.body.id}`).set('Authorization', `Bearer ${token}`)

        expect(response.status).toBe(403)
        expect(response.body).toHaveProperty('message')

    })
    /*
    test('DELETE /users/:id -> Should prevent deactivating a non-existent user', async () => {

        await request(app).post('/users').send(user_two)

        const login = await request(app).post('/login').send(session_two)

        const token = login.body.token
        
        const response = await request(app).delete('/users/1').set('Authorization', `Bearer ${token}`)

        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty('message')
    })
    */
})
