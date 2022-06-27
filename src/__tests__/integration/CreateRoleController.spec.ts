import { Factory } from "../utils/Factory";
import { Setup } from "../utils/Setup";
import { app } from "../../shared/http/app";
import request from "supertest";

describe("CreateRoleController", () => {
  const factory = new Factory();
  const setup = new Setup();

  beforeEach(async () => {
    await setup.db_finish();
  });

  it("POST /role/:id --> show a role", async () => {
    const permission = await factory.factory_permission({});
    const role = await factory.factory_role({ permissionsId: [permission.id] });
    const user = await factory.factory_user({ rolesId: [role.id] });
    const session = await factory.factory_session({});

    const response = await request(app)
      .post(`/role/create`)
      .set("authorization", `Bearer ${session.token}`)
      .send({
        name: "Role",
        description: "role description",
        permissions: [permission.id],
      });

    expect(response.status).toBe(201);
  });

  it("POST /role/create --> (FAIL) token invalid", async () => {
    const product = await factory.factory_product({});
    const permission = await factory.factory_permission({
      name: "Permission test",
    });
    const response = await request(app)
      .post(`/role/create`)
      .set("authorization", `Bearer invalidtoken`)
      .send({
        name: "Role",
        description: "role description",
        permissions: [permission.id],
      });

    expect(response.status).toBe(400);
  });

  it("POST /role/create --> (FAIL) token not provided", async () => {
    const product = await factory.factory_product({});
    const permission = await factory.factory_permission({
      name: "Permission test",
    });

    const response = await request(app)
      .post(`/role/create`)
      .send({
        name: "Role",
        description: "role description",
        permissions: [permission.id],
      });

    expect(response.status).toBe(400);
  });
});
