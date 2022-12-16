import { DataSource } from "typeorm";

require("dotenv").config();

const AppDataSource = new DataSource(
  process.env.NODE_ENV === "test"
    ? {
        type: "sqlite",
        database: ":memory:",
        synchronize: true,
        entities: ["src/entities/**/*.ts"],
      }
    : {
        type: "postgres",
        host: process.env.HOST,
        port: 5432,
        username: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DB,
        logging: true,
        synchronize: true,
        entities: ["src/entities/**/*.ts"],
        migrations: ["src/migrations/*.ts"],
      }
);

export { AppDataSource };
