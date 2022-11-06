import { AppDataSource } from "../../../data-source"
import { product, session, user } from "../../../mocks"
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

    it('POST /products -> Must be able to create a new product', async () => {

        const login = await request(app).post('/session').send(session)

        const token = login.body.token
        
        const response = await request(app).post('/products').send(product).set('Authorization', `Bearer ${token}`)

        expect(response.status).toBe(201)
    
        expect(response.body).toHaveProperty('id')
        expect(response.body).toHaveProperty('title')
        expect(response.body).toHaveProperty('price')
        expect(response.body).toHaveProperty('categorie')
    })
    
    it('POST /products -> Should prevent to create a product without token', async () => {

        const response = await request(app).post('/products').send(product)

        expect(response.status).toBe(401)
        expect(response.body).toHaveProperty('message')
    })
})
