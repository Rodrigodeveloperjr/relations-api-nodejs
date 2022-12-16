import { IProductUpdateRequest } from "../../interfaces/products";
import { AppDataSource } from "../../data-source";
import { Product } from "../../entities/products";
import { AppError } from "../../errors";

const updateProductService = async (
  product: IProductUpdateRequest,
  id: string
): Promise<Product> => {
  const productRepository = AppDataSource.getRepository(Product);

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
    categorie: product.categorie ? product.categorie : findProduct.categorie,
  });

  const updatedProduct = await productRepository.findOneBy({ id });

  return updatedProduct!;
};

export { updateProductService };
