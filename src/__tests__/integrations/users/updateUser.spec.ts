import { user, session, updatedUser, userTwo, sessionTwo } from "../../../mocks"
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

    it('PATCH /users/:id -> Must be able to update a user', async () => {

        const user_response = await request(app).post('/users').send(user)

        const login = await request(app).post('/session').send(session)

        const token = login.body.token
        
        const response = await request(app).patch(`/users/${user_response.body.id}`).send(updatedUser).set('Authorization', `Bearer ${token}`)

        expect(response.status).toBe(200)
        
        expect(response.body).toHaveProperty('name')
        expect(response.body).toHaveProperty('email')
        expect(response.body).toHaveProperty('password')
        expect(response.body).toHaveProperty('cpf')
        expect(response.body).toHaveProperty('address')
        expect(response.body).toHaveProperty('isActive')
        expect(response.body).toHaveProperty('createdAt')
        expect(response.body).toHaveProperty('updatedAt')
        expect(response.body).toHaveProperty('plan')
        expect(response.body).toHaveProperty('cards')
        expect(response.body).toHaveProperty('products')
    })

    it('PATCH /users/:id -> Should prevent updating a user with no token', async () => {

        const user_response = await request(app).post('/users').send(user)
        
        const response = await request(app).patch(`/users/${user_response.body.id}`).send(updatedUser)

        expect(response.status).toBe(401)
        expect(response.body).toHaveProperty('message')
    })

    it('PATCH /users/:id -> Should prevent a disabled user from updating', async () => {

        const user_response = await request(app).post('/users').send(userTwo)

        const login = await request(app).post('/session').send(sessionTwo)

        const token = login.body.token
        
        await request(app).delete(`/users/${user_response.body.id}`).set('Authorization', `Bearer ${token}`)
        
        const response = await request(app).patch(`/users/${user_response.body.id}`).send(updatedUser).set('Authorization', `Bearer ${token}`)

        expect(response.status).toBe(403)
        expect(response.body).toHaveProperty('message')
    })
    /*
    test('PATCH /users/:id -> Should prevent a non-existent user from updating', async () => {

        const login = await request(app).post('/login').send(session)

        const token = login.body.token
        
        const response = await request(app).patch('/users/1').send(updated_user).set('Authorization', `Bearer ${token}`)

        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty('message')
    })
    */
})
