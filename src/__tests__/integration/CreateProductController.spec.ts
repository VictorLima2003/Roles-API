import { Factory } from "../utils/Factory";
import { Setup } from "../utils/Setup";
import { app } from "../../shared/http/app";
import request from "supertest";
import { Prisma } from "@prisma/client";

describe("CreateProductController", () => {
  const factory = new Factory();
  const setup = new Setup();

  beforeEach(async () => {
    await setup.db_finish();
  });

  it("POST /product/create --> create new product", async () => {
    await factory.factory_user({});
    const session = await factory.factory_session({});

    const response = await request(app)
      .post("/product/create")
      .set("authorization", `Bearer ${session.token}`)
      .send({
        name: "Product",
        description: "description",
        price: 10.0,
      });

    expect(response.status).toBe(201);
  });

  it("POST /product/create --> (FAIL) token not provider", async () => {
    const product = await factory.factory_product({});

    const response = await request(app).post("/product/create").send({
      name: "Product",
      description: "description",
      price: 10.0,
    });

    expect(response.status).toBe(400);
  });

  it("POST /product/create --> (FAIL) invalid token", async () => {
    const product = await factory.factory_product({});

    const response = await request(app)
      .post("/product/create")
      .set("authorization", `Bearer invalidtoken`)
      .send({
        name: "Product",
        description: "description",
        price: 10.0,
      });

    expect(response.status).toBe(400);
  });

  it("POST /product/create --> (FAIL) user dont have access", async () => {
    const product = await factory.factory_product({});
    const role = await factory.factory_role({ name: "ROLE_USER" });
    const user = await factory.factory_user({ rolesId: [role.id] });
    const session = await factory.factory_session({ username: user.username });

    const response = await request(app)
      .post("/product/create")
      .set("authorization", `Bearer ${session.token}`);

    expect(response.status).toBe(403);
  });
});
