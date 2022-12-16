import { createUserService } from "../../../services/users/createUser.service";
import { updateUserService } from "../../../services/users/updateUser.service";
import { AppDataSource } from "../../../data-source";
import { updatedUser, user } from "../../../mocks";
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

  it("Must be able to update a user", async () => {
    const result_user = await createUserService(user);

    const result = await updateUserService(updatedUser, result_user.id);

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
