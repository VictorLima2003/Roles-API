import { Factory } from "../utils/Factory";
import { Setup } from "../utils/Setup";
import { app } from "../../shared/http/app";
import request from "supertest";
import { Prisma } from "@prisma/client";

describe("CreatePermissionController", () => {
  const factory = new Factory();
  const setup = new Setup();

  beforeEach(async () => {
    await setup.db_finish();
  });

  it("POST /product/create --> (FAIL) token not provider", async () => {
    const product = await factory.factory_product({});

    const response = await request(app).post("/permission/create").send({
      name: "Permission",
      description: "permission description",
    });

    expect(response.status).toBe(400);
  });

  it("POST /product/create --> (FAIL) token invalid", async () => {
    await factory.factory_user({});
    const session = await factory.factory_session({});

    const response = await request(app)
      .post("/permission/create")
      .set("authorization", `Bearer invalidtoken`)
      .send({
        name: "Permission",
        description: "permission description",
      });

    expect(response.status).toBe(400);
  });

  it("POST /permission/create --> (FAIL) user dont have access", async () => {
    const product = await factory.factory_product({});
    const role = await factory.factory_role({ name: "ROLE_USER" });
    const user = await factory.factory_user({ rolesId: [role.id] });
    const session = await factory.factory_session({
      username: user.username,
    });

    const response = await request(app)
      .post("/permission/create")
      .set("authorization", `Bearer ${session.token}`)
      .send({
        name: "Permission",
        description: "permission description",
      });

    expect(response.status).toBe(403);
  });

  it("POST /permission/create --> create new permission", async () => {
    const product = await factory.factory_product({});
    const permission = await factory.factory_permission({
      name: "Permission_user",
    });
    const role = await factory.factory_role({
      permissionsId: [permission.id],
    });
    const user = await factory.factory_user({ rolesId: [role.id] });
    const session = await factory.factory_session({ username: user.username });

    const response = await request(app)
      .post("/permission/create")
      .set("authorization", `Bearer ${session.token}`)
      .send({
        name: "Permission",
        description: "description permission",
      });

    expect(response.status).toBe(201);
  });
});
