import { AppDataSource } from '../../../data-source'
import { DataSource } from 'typeorm'
import { plan } from '../../mocks'
import { createPlanService } from '../../../services/plans/createPlan.service'


describe('Tests for plan service', () => {

    let connection: DataSource

    beforeAll(async () => {
        
        await AppDataSource.initialize()
        .then(res => connection = res)
        .catch(err => console.error('Error during Data Source initialization', err))
    })

    afterAll(async () => await connection.destroy())

    test('Must be able to create a new plan', async () => {
    
        const result = await createPlanService(plan)

        expect(result).toHaveProperty('id')
        expect(result).toHaveProperty('provider')
        expect(result).toHaveProperty('plan_name')
        expect(result).toHaveProperty('monthly_payment')
        expect(result).toHaveProperty('signature_date')
    })
})
