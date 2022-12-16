import { AppDataSource } from "./data-source";
import { app } from "./app";

(async () => {
  await AppDataSource.initialize()
    .then(() => console.log("Database connected"))
    .catch((error) =>
      console.error("Error during Data Source initialization", error)
    );

  app.listen(process.env.PORT, () =>
    console.log(`Server running in http://localhost:${process.env.PORT}`)
  );
})();
