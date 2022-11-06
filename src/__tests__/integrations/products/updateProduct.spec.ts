import { user, session, product, updated_product } from "../../mocks"
import { AppDataSource } from "../../../data-source"
import { DataSource } from "typeorm"
import { app } from "../../../app"
import request from "supertest"


describe('Testing product routes', () => {

    let connection: DataSource

    beforeAll(async () => {
        
        await AppDataSource.initialize()
        .then(res => connection = res)
        .catch(err => console.error('Error during Data Source initialization', err))

        await request(app).post('/users').send(user)
    })

    afterAll(async () => await connection.destroy())

    it('PATCH /products/:id -> Must be able to update a user', async () => {

        const login = await request(app).post('/session').send(session)

        const token = login.body.token

        const product_response = await request(app).post('/products').send(product).set('Authorization', `Bearer ${token}`)
        
        const response = await request(app).patch(`/products/${product_response.body.id}`).send(updated_product).set('Authorization', `Bearer ${token}`)

        expect(response.status).toBe(200)
    
        expect(response.body).toHaveProperty('id')
        expect(response.body).toHaveProperty('title')
        expect(response.body).toHaveProperty('price')
        expect(response.body).toHaveProperty('categorie')
    })

    it('PATCH /products/:id -> Should prevent updating a user with no token', async () => {

        const product_response = await request(app).post('/products').send(product)
        
        const response = await request(app).patch(`/products/${product_response.body.id}`).send(updated_product)

        expect(response.status).toBe(401)
        expect(response.body).toHaveProperty('message')

    })
    /*
    test('PATCH /products/:id -> Should prevent a non-existent user from updating', async () => {

        const login = await request(app).post('/session').send(session)

        const token = login.body.token
        
        const response = await request(app).patch('/products/1').send(updated_product).set('Authorization', `Bearer ${token}`)

        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty('message')
    })
    */
})
