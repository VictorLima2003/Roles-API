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

  it("POST /user/create --> create a new user", async () => {
    const permission = await factory.factory_permission({});
    const role = await factory.factory_role({ permissionsId: [permission.id] });
    const user = await factory.factory_user({
      rolesId: [role.id],
    });
    const session = await factory.factory_session({});

    const response = await request(app)
      .post(`/user/create`)
      .set("authorization", `Bearer ${session.token}`)
      .send({
        name: "Victor Lima",
        username: "victorlima",
        password: "victorlimapassword",
        roles: [role.id],
      });

    expect(response.status).toBe(201);
  });

  it("POST /user/create --> (FAIL) token invalid", async () => {
    const permission = await factory.factory_permission({});
    const role = await factory.factory_role({
      permissionsId: [permission.id],
    });
    const user = await factory.factory_user({
      rolesId: [role.id],
    });
    const session = await factory.factory_session({});

    const response = await request(app)
      .post(`/user/create`)
      .set("authorization", `Bearer invalidtoken`)
      .send({
        name: "Victor Lima",
        username: "victorlima",
        password: "victorlimapassword",
        roles: [role.id],
      });

    expect(response.status).toBe(400);
  });

  it("POST /user/create --> (FAIL) token not provided", async () => {
    const permission = await factory.factory_permission({});
    const role = await factory.factory_role({
      permissionsId: [permission.id],
    });
    const user = await factory.factory_user({
      rolesId: [role.id],
    });
    const session = await factory.factory_session({});

    const response = await request(app)
      .post(`/user/create`)
      .send({
        name: "Victor Lima",
        username: "victorlima",
        password: "victorlimapassword",
        roles: [role.id],
      });

    expect(response.status).toBe(400);
  });

  it("POST /user/create --> username alread exists", async () => {
    const permission = await factory.factory_permission({});
    const role = await factory.factory_role({
      permissionsId: [permission.id],
    });
    const user = await factory.factory_user({
      rolesId: [role.id],
    });
    const session = await factory.factory_session({});

    const response = await request(app)
      .post(`/user/create`)
      .set("authorization", `Bearer ${session.token}`)
      .send({
        name: "Victor",
        username: user.username,
        password: "victorlimapassword",
        roles: [role.id],
      });

    expect(response.status).toBe(400);
  });
});
