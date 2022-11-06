import { AppDataSource } from '../../../data-source'
import { DataSource } from 'typeorm'
import { product } from '../../mocks'
import { createProductService } from '../../../services/products/createProduct.service'
import { deleteProductService } from '../../../services/products/deleteProduct.service'


describe('Tests for product service', () => {

    let connection: DataSource

    beforeAll(async () => {
        
        await AppDataSource.initialize()
        .then(res => connection = res)
        .catch(err => console.error('Error during Data Source initialization', err))
    })

    afterAll(async () => await connection.destroy())

    test('Must be able to delete a product', async () => {
    
        const product_result = await createProductService(product)

        const result = await deleteProductService(product_result.id)

        expect(result).toBeUndefined()
    })
})
