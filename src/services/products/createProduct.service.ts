import { productRepository } from "../../repositories/productRepository";
import { IProductRequest } from "../../interfaces/products";
import { Product } from "../../entities/products";

const createProductService = async (
  product: IProductRequest
): Promise<Product> => {
  const newProduct = new Product();
  newProduct.title = product.title;
  newProduct.description = product.description;
  newProduct.price = product.price;
  newProduct.category = product.category;

  productRepository.create(newProduct);
  await productRepository.save(newProduct);

  return newProduct;
};

export { createProductService };
