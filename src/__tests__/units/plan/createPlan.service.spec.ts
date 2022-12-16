import { createPlanService } from "../../../services/plans/createPlan.service";
import { AppDataSource } from "../../../data-source";
import { DataSource } from "typeorm";
import { plan } from "../../../mocks";

describe("Tests for plan service", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) =>
        console.error("Error during Data Source initialization", err)
      );
  });

  afterAll(async () => await connection.destroy());

  it("Must be able to create a new plan", async () => {
    const result = await createPlanService(plan);

    expect(result).toHaveProperty("id");
    expect(result).toHaveProperty("provider");
    expect(result).toHaveProperty("planName");
    expect(result).toHaveProperty("monthlyPayment");
    expect(result).toHaveProperty("signatureDate");
  });
});
