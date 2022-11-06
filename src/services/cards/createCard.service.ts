import { ICardRequest } from "../../interfaces/cards"
import { AppDataSource } from "../../data-source"
import { Card } from "../../entities/cards"


const createCardService = async ({ card_name, card_number, expiration_date, cvc, func }: ICardRequest): Promise<Card> => {

    const cardRepository = AppDataSource.getRepository(Card)

    const card = new Card()
    card.card_name = card_name
    card.card_number = card_number
    card.expiration_date = expiration_date
    card.cvc = cvc
    card.func = func

    cardRepository.create(card)
    await cardRepository.save(card)

    return card
}

export { createCardService }
