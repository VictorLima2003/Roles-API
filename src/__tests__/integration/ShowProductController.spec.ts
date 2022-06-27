import { Factory } from "../utils/Factory";
import { Setup } from "../utils/Setup";
import { app } from "../../shared/http/app";
import request from "supertest";
import { Prisma } from "@prisma/client";

describe("ShowProductController", () => {
  const factory = new Factory();
  const setup = new Setup();

  beforeEach(async () => {
    await setup.db_finish();
  });

  it("GET /product/:id --> show a product", async () => {
    const product = await factory.factory_product({});
    await factory.factory_user({});
    const session = await factory.factory_session({});

    const response = await request(app)
      .get(`/product/${product.id}`)
      .set("authorization", `Bearer ${session.token}`)
      .send({
        name: "Product",
        description: "description",
        price: new Prisma.Decimal(10.0),
      });

    expect(response.status).toBe(200);
  });

  it("GET /product/:id --> (FAIL) token invalid", async () => {
    const product = await factory.factory_product({});

    const response = await request(app)
      .get(`/product/${product.id}`)
      .set("authorization", `Bearer invalidtoken`)
      .send({
        name: "Product",
        description: "description",
        price: new Prisma.Decimal(10.0),
      });

    expect(response.status).toBe(400);
  });

  it("GET /product/:id --> (FAIL) token not provided", async () => {
    const product = await factory.factory_product({});

    const response = await request(app)
      .get(`/product/${product.id}`)
      .send({
        name: "Product",
        description: "description",
        price: new Prisma.Decimal(10.0),
      });

    expect(response.status).toBe(400);
  });
});
