import errorMiddleware from "./middlewares/error.middleware"
import { app_routes } from "./routes"
import express from "express"
import "dotenv/config"


const app = express()

app.use(express.json())

app_routes(app)

errorMiddleware(app)

export { app }
