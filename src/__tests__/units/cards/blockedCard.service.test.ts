import { AppDataSource } from '../../../data-source'
import { DataSource } from 'typeorm'
import { card } from '../../mocks'
import { createCardService } from '../../../services/cards/createCard.service'
import { blockedCardService } from '../../../services/cards/blockedCard.service'


describe('Tests for card service', () => {

    let connection: DataSource

    beforeAll(async () => {
        
        await AppDataSource.initialize()
        .then(res => connection = res)
        .catch(err => console.error('Error during Data Source initialization', err))
    })

    afterAll(async () => await connection.destroy())

    test('Must be able to blocked a card', async () => {
    
        const result_card = await createCardService(card)

        const result = await blockedCardService(result_card.id)

        expect(result).toBeUndefined()
    })
})
