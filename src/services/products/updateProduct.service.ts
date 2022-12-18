import { productRepository } from "../../repositories/productRepository";
import { IProductUpdateRequest } from "../../interfaces/products";
import { Product } from "../../entities/products";
import { AppError } from "../../errors";

const updateProductService = async (
  product: IProductUpdateRequest,
  id: string
): Promise<Product> => {
  const findProduct = await productRepository.findOneBy({ id });

  if (!findProduct) {
    throw new AppError("Product not found", 404);
  }

  await productRepository.update(id, {
    title: product.title ? product.title : findProduct.title,
    description: product.description
      ? product.description
      : findProduct.description,
    price: product.price ? product.price : findProduct.price,
    category: product.category ? product.category : findProduct.category,
  });

  const updatedProduct = await productRepository.findOneBy({ id });

  return updatedProduct!;
};

export { updateProductService };
