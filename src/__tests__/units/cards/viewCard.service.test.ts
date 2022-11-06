import { createCardService } from "../../../services/cards/createCard.service"
import { viewCardService } from "../../../services/cards/viewCard.service"
import { AppDataSource } from "../../../data-source"
import { DataSource } from "typeorm"
import { card } from "../../mocks"


describe('Tests for card service', () => {

    let connection: DataSource

    beforeAll(async () => {
        
        await AppDataSource.initialize()
        .then(res => connection = res)
        .catch(err => console.error('Error during Data Source initialization', err))
    })

    afterAll(async () => await connection.destroy())

    it('Must be able to see a card', async () => {
    
        const result_card = await createCardService(card)

        const result = await viewCardService(result_card.id)

        expect(result).toHaveProperty('id')
        expect(result).toHaveProperty('card_name')
        expect(result).toHaveProperty('card_number')
        expect(result).toHaveProperty('expiration_date')
        expect(result).toHaveProperty('cvc')
    })
})
