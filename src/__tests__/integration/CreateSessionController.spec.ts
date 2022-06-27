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

  it("POST /session/create --> create a new session", async () => {
    const permission = await factory.factory_permission({});
    const role = await factory.factory_role({ permissionsId: [permission.id] });
    const user = await factory.factory_user({
      rolesId: [role.id],
      password: "userpassword",
    });

    const response = await request(app).post(`/session/create`).send({
      username: user.username,
      password: "userpassword",
    });

    expect(response.status).toBe(200);
  });

  it("POST /session/create --> (FAIL) password invalid, return error code 400", async () => {
    const permission = await factory.factory_permission({});
    const role = await factory.factory_role({
      permissionsId: [permission.id],
    });
    const user = await factory.factory_user({
      rolesId: [role.id],
      password: "userpassword",
    });

    const response = await request(app).post(`/session/create`).send({
      username: user.username,
      password: "user_password",
    });

    expect(response.status).toBe(401);
  });

  it("POST /session/create --> (FAIL) user not exists, return error code 400", async () => {
    const permission = await factory.factory_permission({});
    const role = await factory.factory_role({
      permissionsId: [permission.id],
    });
    const user = await factory.factory_user({
      rolesId: [role.id],
      password: "userpassword",
    });

    const response = await request(app).post(`/session/create`).send({
      username: "victor",
      password: "user_password",
    });

    expect(response.status).toBe(401);
  });
});
