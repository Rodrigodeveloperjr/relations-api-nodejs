import { app } from "./app"
import { AppDataSource } from "./data-source"


(async () => {

    await AppDataSource.initialize()
    .then(() => console.log('Database connected'))
    .catch(error => console.error('Error during Data Source initialization', error))

    app.listen(process.env.PORT, () => console.log('Server running in port ', process.env.PORT))
})()
