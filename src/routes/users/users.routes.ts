import { Router } from "express"

import { disableUserController } from "../../controllers/users/disableUser.controller"
import { createUserController } from "../../controllers/users/createUser.controller"
import { updateUserController } from "../../controllers/users/updateUser.controller"
import { activeUserController } from "../../controllers/users/activeUser.controller"
import { listUsersController } from "../../controllers/users/listUsers.controller"
import { viewUserController } from "../../controllers/users/viewUser.controller"

import { authTokenMiddleware } from "../../middlewares/authToken.middleware"
import { isDisableMiddleware } from "../../middlewares/isDisable.middleware"
import { isActiveMiddleware } from "../../middlewares/isActive.middleware"


const routes = Router()

const user_routes = () => {

    routes.post('', createUserController)
    routes.get('', authTokenMiddleware, isDisableMiddleware, listUsersController)
    routes.patch('/:id', authTokenMiddleware, isDisableMiddleware, updateUserController)
    routes.delete('/:id', authTokenMiddleware, isDisableMiddleware, disableUserController)
    routes.post('/:id', authTokenMiddleware, isActiveMiddleware, activeUserController)
    routes.get('/profile', authTokenMiddleware, isDisableMiddleware, viewUserController)

    return routes
}

export { user_routes }
