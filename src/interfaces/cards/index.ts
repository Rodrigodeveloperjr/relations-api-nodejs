interface ICardRequest {
    card_name: string
    card_number: string
    expiration_date: string
    cvc: number
    func?: string
}

export { ICardRequest }
