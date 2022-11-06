import { IProductUpdateRequest } from "../../interfaces/products"
import { AppDataSource } from "../../data-source"
import { Product } from "../../entities/products"


const updateProductService = async ({ title, description, price, categorie }: IProductUpdateRequest, id: string): Promise<Product> => {

    const productRepository = AppDataSource.getRepository(Product)

    const find_product = await productRepository.findOneBy({ id })

    await productRepository.update(id, {
        title: title ? title : find_product!.title,
        description: description ? description : find_product!.description,
        price: price ? price : find_product!.price,
        categorie: categorie ? categorie : find_product!.categorie,
    })

    const product = await productRepository.findOneBy({ id })

    return product!
}

export { updateProductService }
