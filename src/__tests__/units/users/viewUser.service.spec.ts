import { createUserService } from "../../../services/users/createUser.service";
import { viewUserService } from "../../../services/users/viewUser.service";
import { AppDataSource } from "../../../data-source";
import { DataSource } from "typeorm";
import { user } from "../../../mocks";

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

  it("Must be able to see a user", async () => {
    const result_user = await createUserService(user);

    const result = await viewUserService(result_user.email);

    expect(result).toHaveProperty("id");
    expect(result).toHaveProperty("name");
    expect(result).toHaveProperty("email");
    expect(result).toHaveProperty("password");
    expect(result).toHaveProperty("cpf");
    expect(result).toHaveProperty("address");
    expect(result).toHaveProperty("isActive");
    expect(result).toHaveProperty("createdAt");
    expect(result).toHaveProperty("updatedAt");
    expect(result).toHaveProperty("plan");
    expect(result).toHaveProperty("cards");
    expect(result).toHaveProperty("products");
  });
});
