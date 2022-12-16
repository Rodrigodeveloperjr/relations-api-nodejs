import { updateProductService } from "../../services/products/updateProduct.service";
import { IProductUpdateRequest } from "../../interfaces/products";
import { Request, Response } from "express";

const updateProductController = async (req: Request, res: Response) => {
  const id: string = req.params.id;

  const product: IProductUpdateRequest = req.body;

  const updatedProduct = await updateProductService(product, id);

  return res.json(updatedProduct);
};

export { updateProductController };
