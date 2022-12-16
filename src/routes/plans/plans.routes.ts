import { Router } from "express";

import { createPlanController } from "../../controllers/plans/createPlan.controller";

import { authTokenMiddleware } from "../../middlewares/authToken.middleware";

const routes = Router();

const plansRoutes = () => {
  routes.post("", authTokenMiddleware, createPlanController);

  return routes;
};

export { plansRoutes };
