import { Router } from "express"

import { createPlanController } from "../../controllers/plans/createPlan.controller"

import { authTokenMiddleware } from "../../middlewares/authToken.middleware"


const routes = Router()

const plans_routes = () => {

    routes.post('', authTokenMiddleware, createPlanController)

    return routes
}

export { plans_routes }
