import { Express } from "express"

import { products_routes } from "./products/products.routes"
import { session_routes } from "./session/session.routes"
import { cards_routes } from "./cards/cards.routes"
import { plans_routes } from "./plans/plans.routes"
import { user_routes } from "./users/users.routes"


const app_routes = (app: Express) => {

    app.use('/users', user_routes())
    app.use('/session', session_routes())
    app.use('/cards', cards_routes())
    app.use('/plans', plans_routes())
    app.use('/products', products_routes())
}

export { app_routes }
