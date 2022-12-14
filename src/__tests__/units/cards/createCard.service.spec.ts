import { createCardService } from "../../../services/cards/createCard.service";
import { AppDataSource } from "../../../data-source";
import { DataSource } from "typeorm";
import { card } from "../../../mocks";

describe("Tests for card service", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) =>
        console.error("Error during Data Source initialization", err)
      );
  });

  afterAll(async () => await connection.destroy());

  it("Must be able to create a new card", async () => {
    const result = await createCardService(card);

    expect(result).toHaveProperty("id");
    expect(result).toHaveProperty("cardName");
    expect(result).toHaveProperty("cardNumber");
    expect(result).toHaveProperty("expirationDate");
    expect(result).toHaveProperty("cvc");
  });
});
