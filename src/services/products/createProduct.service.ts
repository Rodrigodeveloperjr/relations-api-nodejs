import { IProductRequest } from "../../interfaces/products";
import { AppDataSource } from "../../data-source";
import { Product } from "../../entities/products";

const createProductService = async (
  product: IProductRequest
): Promise<Product> => {
  const productRepository = AppDataSource.getRepository(Product);

  const newProduct = new Product();
  newProduct.title = product.title;
  newProduct.description = product.description;
  newProduct.price = product.price;
  newProduct.categorie = product.categorie;

  productRepository.create(newProduct);
  await productRepository.save(newProduct);

  return newProduct;
};

export { createProductService };
