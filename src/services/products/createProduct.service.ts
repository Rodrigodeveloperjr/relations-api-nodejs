import { IProductRequest } from "../../interfaces/products"
import { AppDataSource } from "../../data-source"
import { Product } from "../../entities/products"


const createProductService = async ({ title, description, price, categorie }: IProductRequest): Promise<Product> => {

    const productRepository = AppDataSource.getRepository(Product)

    const product = new Product()
    product.title = title
    product.description = description
    product.price = price
    product.categorie = categorie

    productRepository.create(product)
    await productRepository.save(product)

    return product
}

export { createProductService }
