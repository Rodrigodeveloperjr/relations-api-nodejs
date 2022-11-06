import { createProductService } from "../../../services/products/createProduct.service"
import { AppDataSource } from "../../../data-source"
import { product } from "../../mocks"
import { DataSource } from "typeorm"


describe('Tests for product service', () => {

    let connection: DataSource

    beforeAll(async () => {
        
        await AppDataSource.initialize()
        .then(res => connection = res)
        .catch(err => console.error('Error during Data Source initialization', err))
    })

    afterAll(async () => await connection.destroy())

    it('Must be able to create a new product', async () => {
    
        const result = await createProductService(product)

        expect(result).toHaveProperty('id')
        expect(result).toHaveProperty('title')
        expect(result).toHaveProperty('description')
        expect(result).toHaveProperty('price')
        expect(result).toHaveProperty('categorie')
    })
})
