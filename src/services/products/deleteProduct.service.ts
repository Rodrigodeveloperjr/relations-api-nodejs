import { Product } from "../../entities/products"
import { AppDataSource } from "../../data-source"


const deleteProductService = async (id: string): Promise<void> => {

    const productRepository = AppDataSource.getRepository(Product)

    const product = await productRepository.findOneBy({ id })

    await productRepository.delete(product!.id)
}

export { deleteProductService }
