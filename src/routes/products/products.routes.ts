import { Router } from "express";

import { createProductController } from "../../controllers/products/createProduct.controller";
import { deleteProductController } from "../../controllers/products/deleteProduct.controller";
import { updateProductController } from "../../controllers/products/updateProduct.controller";

import { authTokenMiddleware } from "../../middlewares/authToken.middleware";

const routes = Router();

const productsRoutes = () => {
  routes.post("", authTokenMiddleware, createProductController);

  routes.delete("/:id", authTokenMiddleware, deleteProductController);

  routes.patch("/:id", authTokenMiddleware, updateProductController);

  return routes;
};

export { productsRoutes };
