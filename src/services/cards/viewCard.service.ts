import { AppDataSource } from "../../data-source"
import { Card } from "../../entities/cards"


const viewCardService = async (id: string): Promise<Card> => {

    const cardRepository = AppDataSource.getRepository(Card)

    const card = await cardRepository.findOneBy({ id })

    return card!
}

export { viewCardService }
