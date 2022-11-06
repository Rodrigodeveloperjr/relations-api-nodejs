interface IProductRequest {
    title: string
    description?: string
    price: number
    categorie: string
}

interface IProductUpdateRequest {
    title?: string
    description?: string
    price?: number
    categorie?: string
}

export { IProductRequest, IProductUpdateRequest }
