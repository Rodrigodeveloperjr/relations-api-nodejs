import { Product } from "../../entities/products";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors";

const deleteProductService = async (id: string): Promise<void> => {
  const productRepository = AppDataSource.getRepository(Product);

  const product = await productRepository.findOneBy({ id });

  if (!product) {
    throw new AppError("Product not found", 404);
  }

  await productRepository.delete(product.id);
};

export { deleteProductService };
