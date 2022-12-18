import { Router } from "express";

import { blockedCardController } from "../../controllers/cards/blockedCard.controller";
import { createCardController } from "../../controllers/cards/createCard.controller";
import { unlockCardController } from "../../controllers/cards/unlockCard.controller";
import { viewCardController } from "../../controllers/cards/viewCard.controller";

import { schemaValidationMiddleware } from "../../middlewares/schemaValidation.middleware";
import { authTokenMiddleware } from "../../middlewares/authToken.middleware";
import { isBlockedMiddleware } from "../../middlewares/isBlocked.middleware";
import { cardSchema } from "../../schemas/card.schema";

const routes = Router();

const cardsRoutes = () => {
  routes.post(
    "",
    schemaValidationMiddleware(cardSchema),
    authTokenMiddleware,
    createCardController
  );

  routes.get(
    "/:id",
    authTokenMiddleware,
    isBlockedMiddleware,
    viewCardController
  );

  routes.delete(
    "/:id",
    authTokenMiddleware,
    isBlockedMiddleware,
    blockedCardController
  );

  routes.post("/:id", authTokenMiddleware, unlockCardController);

  return routes;
};

export { cardsRoutes };
