import { listUsersService } from "../../../services/users/listUsers.service";
import { AppDataSource } from "../../../data-source";
import { DataSource } from "typeorm";

describe("Tests for user service", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) =>
        console.error("Error during Data Source initialization", err)
      );
  });

  afterAll(async () => await connection.destroy());

  it("Should be able to list multiple users", async () => {
    const result = await listUsersService();

    expect(result).toHaveProperty("map");
  });
});
