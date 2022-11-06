import { AppDataSource } from "../../data-source"
import { Card } from "../../entities/cards"


const blockedCardService = async (id: string): Promise<void> => {

    const cardRepository = AppDataSource.getRepository(Card)

    await cardRepository.update(id, { is_blocked: true })
}

export { blockedCardService }
