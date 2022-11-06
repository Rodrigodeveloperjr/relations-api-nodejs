import { IAddressRequest } from "../../interfaces/address"
import { ICardRequest } from "../../interfaces/cards"
import { IPlanRequest } from "../../interfaces/plans"
import { IProductRequest } from "../../interfaces/products"
import { ISessionRequest } from "../../interfaces/session"
import { IUserRequest, IUserUpdateRequest } from "../../interfaces/users"


const address: IAddressRequest = {
    country: 'United State',
    state: 'Califórnia',
    city: 'Mountain View',
    district: 'Amphitheatre Pkwy',
    road: 'Amphitheatre Pkwy',
    number: 1600,
    complement: 'Googleplex',
    zip_code: 94043
}

const user: IUserRequest = {
    name: 'example',
    email: 'example@org.com.br',
    password: 'example@123',
    cpf: '99999999999',
    address: address
}

const user_two: IUserRequest = {
    name: 'example',
    email: 'ex@org.com.br',
    password: 'example@123',
    cpf: '99999999990',
    address: address
}

const updated_user: IUserUpdateRequest = {
    name: 'new_example',
    cpf: '12345678900'
}

const session: ISessionRequest = {
    email: 'example@org.com.br',
    password: 'example@123'
}

const session_two: ISessionRequest = {
    email: 'ex@org.com.br',
    password: 'example@123'
}

const invalid_session: ISessionRequest = {
    email: 'example@org.com.br',
    password: 'example'
}

const card: ICardRequest = {
    card_name: 'example',
    card_number: '9999 9999 9999 9999',
    expiration_date: '00/00',
    cvc: 999,
    func: 'credits and debits'
}

const card_two: ICardRequest = {
    card_name: 'ex',
    card_number: '0000 9999 0000 9999',
    expiration_date: '11/11',
    cvc: 919,
    func: 'debits'
}

const plan: IPlanRequest = {
    provider: 'Apple',
    plan_name: 'ICloud',
    monthly_payment: 3.00,
    signature_date: '11/22'
}

const product: IProductRequest = {
    title: 'cap',
    description: 'high cap',
    price: 289.00,
    categorie: 'caps'
}

const updated_product: IProductRequest = {
    title: 'jacket',
    description: 'high jacket',
    price: 489.00,
    categorie: 'jackets'
}

export { user, user_two, updated_user, session, session_two, invalid_session, card, card_two, plan, product, updated_product }
