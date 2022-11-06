import { product, session, user } from "../../mocks"
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

    test('DELETE /products/:id -> Must be able to delete product', async () => {

        const login = await request(app).post('/session').send(session)

        const token = login.body.token

        const product_response = await request(app).post('/products').send(product).set('Authorization', `Bearer ${token}`)
        
        const response = await request(app).delete(`/products/${product_response.body.id}`).set('Authorization', `Bearer ${token}`)

        expect(response.status).toBe(204)
    })
    
    test('DELETE /products/:id -> Should avoid deletion a product without a token', async () => {

        const product_response = await request(app).post('/products').send(product)

        const response = await request(app).delete(`/products/${product_response.body.id}`)

        expect(response.status).toBe(401)
        expect(response.body).toHaveProperty('message')
    })
    /*
    test('DELETE /products/:id -> Should prevent deletion non-existent product', async () => {
        
        const login = await request(app).post('/session').send(session)

        const token = login.body.token

        const response = await request(app).delete('/products/1').set('Authorization', `Bearer ${token}`)

        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty('message')
    })
    */
})
