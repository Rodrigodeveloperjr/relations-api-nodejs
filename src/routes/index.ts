import { Express } from "express";

import { productsRoutes } from "./products/products.routes";
import { sessionRoutes } from "./session/session.routes";
import { cardsRoutes } from "./cards/cards.routes";
import { plansRoutes } from "./plans/plans.routes";
import { userRoutes } from "./users/users.routes";

const appRoutes = (app: Express) => {
  app.use("/users", userRoutes());
  app.use("/session", sessionRoutes());
  app.use("/cards", cardsRoutes());
  app.use("/plans", plansRoutes());
  app.use("/products", productsRoutes());
};

export { appRoutes };
