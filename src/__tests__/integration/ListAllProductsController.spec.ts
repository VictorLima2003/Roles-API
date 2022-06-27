import { Factory } from "../utils/Factory";
import { Setup } from "../utils/Setup";
import { app } from "../../shared/http/app";
import request from "supertest";

describe("ListAllProductsController", () => {
  const factory = new Factory();
  const setup = new Setup();

  beforeEach(async () => {
    await setup.db_finish();
  });

  it("GET /product --> find all products", async () => {
    const product = await factory.factory_product({});
    const user = await factory.factory_user({});
    const session = await factory.factory_session({ username: user.username });

    const response = await request(app)
      .get("/product")
      .set("authorization", `Bearer ${session.token}`);

    expect(response.status).toBe(200);
  });

  it("GET /product --> (FAIL) token not provider", async () => {
    const product = await factory.factory_product({});
    await factory.factory_user({});
    const session = await factory.factory_session({});

    const response = await request(app).get("/product");

    expect(response.status).toBe(400);
  });

  it("GET /product --> (FAIL) invalid token", async () => {
    const product = await factory.factory_product({});

    const response = await request(app)
      .get("/product")
      .set("authorization", `Bearer invalidtoken`);

    expect(response.status).toBe(400);
  });
});
