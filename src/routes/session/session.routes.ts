import { Router } from "express"

import { createSessionController } from "../../controllers/session/createSession.controller"


const routes = Router()

const session_routes = () => {

    routes.post('', createSessionController)

    return routes
}

export { session_routes }
