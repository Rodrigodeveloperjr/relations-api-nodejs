import { createProductService } from "../../services/products/createProduct.service";
import { IProductRequest } from "../../interfaces/products";
import { Request, Response } from "express";

const createProductController = async (req: Request, res: Response) => {
  const product: IProductRequest = req.body;

  const newProduct = await createProductService(product);

  return res.status(201).json(newProduct);
};

export { createProductController };
