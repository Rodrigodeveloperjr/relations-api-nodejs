import { createCardService } from "../../../services/cards/createCard.service"
import { unlockCardService } from "../../../services/cards/unlockCard.service"
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

    it('Must be able to unlock a card', async () => {
    
        const result_card = await createCardService(card)

        const result = await unlockCardService(result_card.id)

        expect(result).toHaveProperty('message')
    })
})
