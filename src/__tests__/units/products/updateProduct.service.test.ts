import { AppDataSource } from '../../../data-source'
import { DataSource } from 'typeorm'
import { product, updated_product } from '../../mocks'
import { createProductService } from '../../../services/products/createProduct.service'
import { updateProductService } from '../../../services/products/updateProduct.service'


describe('Tests for product service', () => {

    let connection: DataSource

    beforeAll(async () => {
        
        await AppDataSource.initialize()
        .then(res => connection = res)
        .catch(err => console.error('Error during Data Source initialization', err))
    })

    afterAll(async () => await connection.destroy())

    test('Must be able to update a product', async () => {
    
        const product_result = await createProductService(product)

        const result = await updateProductService(updated_product, product_result.id)

        expect(result).toHaveProperty('id')
        expect(result).toHaveProperty('title')
        expect(result).toHaveProperty('description')
        expect(result).toHaveProperty('price')
        expect(result).toHaveProperty('categorie')
    })
})
