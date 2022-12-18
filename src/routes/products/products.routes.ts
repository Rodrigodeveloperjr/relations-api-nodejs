import { Router } from "express";

import { createProductController } from "../../controllers/products/createProduct.controller";
import { deleteProductController } from "../../controllers/products/deleteProduct.controller";
import { updateProductController } from "../../controllers/products/updateProduct.controller";

import { schemaValidationMiddleware } from "../../middlewares/schemaValidation.middleware";
import { authTokenMiddleware } from "../../middlewares/authToken.middleware";

import { productSchema } from "../../schemas/product.schema";

const routes = Router();

const productsRoutes = () => {
  routes.post(
    "",
    schemaValidationMiddleware(productSchema),
    authTokenMiddleware,
    createProductController
  );

  routes.delete("/:id", authTokenMiddleware, deleteProductController);

  routes.patch("/:id", authTokenMiddleware, updateProductController);

  return routes;
};

export { productsRoutes };
