import { Router } from "express";

import { blockedCardController } from "../../controllers/cards/blockedCard.controller";
import { createCardController } from "../../controllers/cards/createCard.controller";
import { viewCardController } from "../../controllers/cards/viewCard.controller";

import { unlockCardController } from "../../controllers/cards/unlockCard.controller";
import { authTokenMiddleware } from "../../middlewares/authToken.middleware";
import { isBlockedMiddleware } from "../../middlewares/isBlocked.middleware";
import { isUnlockMiddleware } from "../../middlewares/isUnlock.middleware";

const routes = Router();

const cardsRoutes = () => {
  routes.post("", authTokenMiddleware, createCardController);

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

  routes.post(
    "/:id",
    authTokenMiddleware,
    isUnlockMiddleware,
    unlockCardController
  );

  return routes;
};

export { cardsRoutes };
