import { createProductService } from "../../../services/products/createProduct.service";
import { updateProductService } from "../../../services/products/updateProduct.service";
import { product, updatedProduct } from "../../../mocks";
import { AppDataSource } from "../../../data-source";
import { DataSource } from "typeorm";

describe("Tests for product service", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) =>
        console.error("Error during Data Source initialization", err)
      );
  });

  afterAll(async () => await connection.destroy());

  it("Must be able to update a product", async () => {
    const product_result = await createProductService(product);

    const result = await updateProductService(
      updatedProduct,
      product_result.id
    );

    expect(result).toHaveProperty("id");
    expect(result).toHaveProperty("title");
    expect(result).toHaveProperty("description");
    expect(result).toHaveProperty("price");
    expect(result).toHaveProperty("categorie");
  });
});
