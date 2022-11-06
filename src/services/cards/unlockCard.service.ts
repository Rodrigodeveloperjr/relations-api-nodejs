import { AppDataSource } from "../../data-source"
import { Card } from "../../entities/cards"


const unlockCardService = async (id: string): Promise<object> => {

    const cardRepository = AppDataSource.getRepository(Card)

    await cardRepository.update(id, { is_blocked: false })

    return { message: 'Card unlocked successfully' }
}

export { unlockCardService }
