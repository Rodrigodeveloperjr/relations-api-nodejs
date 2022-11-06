interface IAddressRequest {
    country: string
    state: string
    city: string
    district: string
    road: string
    number: number
    complement?: string
    zip_code: number
}

interface IAddressUpdateRequest {
    country?: string
    state?: string
    city?: string
    district?: string
    road?: string
    number?: number
    complement?: string
    zip_code?: number
}

export { IAddressRequest, IAddressUpdateRequest }
