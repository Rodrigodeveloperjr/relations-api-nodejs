import { session, user, userTwo, sessionTwo } from "../../../mocks";
import { AppDataSource } from "../../../data-source";
import { DataSource } from "typeorm";
import { app } from "../../../app";
import request from "supertest";

describe("Testing user routes", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) =>
        console.error("Error during Data Source initialization", err)
      );
  });

  afterAll(async () => await connection.destroy());

  test("POST /users/:id -> Must be able to activate a user", async () => {
    const userResponse = await request(app).post("/users").send(user);

    const login = await request(app).post("/session").send(session);

    const token = login.body.token;

    await request(app)
      .delete(`/users/${userResponse.body.id}`)
      .set("Authorization", `Bearer ${token}`);

    const response = await request(app)
      .post(`/users/${userResponse.body.id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message");
  });

  test("POST /users/:id -> Should prevent activation of a user without token", async () => {
    const userResponse = await request(app).post("/users").send(user);

    const response = await request(app).post(`/users/${userResponse.body.id}`);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
  });
});
