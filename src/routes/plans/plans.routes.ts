import { Router } from "express";

import { createPlanController } from "../../controllers/plans/createPlan.controller";

import { schemaValidationMiddleware } from "../../middlewares/schemaValidation.middleware";
import { authTokenMiddleware } from "../../middlewares/authToken.middleware";

import { planSchema } from "../../schemas/plan.schema";

const routes = Router();

const plansRoutes = () => {
  routes.post(
    "",
    schemaValidationMiddleware(planSchema),
    authTokenMiddleware,
    createPlanController
  );

  return routes;
};

export { plansRoutes };
