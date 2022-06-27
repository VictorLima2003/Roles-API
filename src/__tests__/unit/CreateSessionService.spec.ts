import { IUserRepository } from "../../modules/users/repositories/IUserRepository";
import { RoleRepositoryFake } from "../../modules/roles/repositories/fakes/RoleRepositoryFake";
import { PermissionRepositoryFake } from "../../modules/permissions/repositories/fakes/PermissionRepositoryFake";
import { UserRepositoryFake } from "../../modules/users/repositories/fakes/UserRepositoryFake";
import { CreateSessionService } from "../../modules/users/services/CreateSessionService";
import { CreateUserService } from "../../modules/users/services/CreateUserService";
import { IRoleRepository } from "../../modules/roles/repositories/IRoleRepository";
import { IPermissionRepository } from "../../modules/permissions/repositories/IPermissionRepository";
import { AppError } from "../../shared/errors/AppError";
import { IEncoder } from "../../providers/encoder/IEncoder";
import { Encoder } from "../../providers/encoder/bcrypt/Encoder";

describe("CreateSessionService", () => {
  let userRepository: IUserRepository;
  let roleRepository: IRoleRepository;
  let permissionRepository: IPermissionRepository;
  let createSessionsService: CreateSessionService;
  let createUserService: CreateUserService;
  let encoder: IEncoder;

  beforeEach(() => {
    userRepository = new UserRepositoryFake();
    roleRepository = new RoleRepositoryFake();
    permissionRepository = new PermissionRepositoryFake();
    encoder = new Encoder();
    createUserService = new CreateUserService(
      userRepository,
      roleRepository,
      encoder
    );
    createSessionsService = new CreateSessionService(userRepository, encoder);
  });

  it("Should have to access to userRepository", () => {
    expect(createSessionsService.userRepository).toBeDefined();
  });

  it("Shoud have a method called execute", () => {
    expect(createSessionsService.execute).toBeDefined();
  });

  it("Should be able to create a new session", async () => {
    const permission = await permissionRepository.create({
      name: "Permission Name",
      description: "Description Name",
    });

    const role = await roleRepository.create({
      name: "role name",
      description: "role description",
      permissions: [permission.id],
    });

    const user = await createUserService.execute({
      name: "user name",
      username: "user username",
      password: "password",
      roles: [role.id],
    });

    const session = await createSessionsService.execute({
      username: user.username,
      password: "password",
    });

    expect(session).toHaveProperty("token");
  });

  it("Should not be able to create a new session --> User not exists", async () => {
    const permission = await permissionRepository.create({
      name: "Permission Name",
      description: "Description Name",
    });

    const role = await roleRepository.create({
      name: "role name",
      description: "role description",
      permissions: [permission.id],
    });

    const user = await userRepository.create({
      name: "user name",
      username: "user username",
      password: "user password",
      roles: [role.id],
    });

    expect(
      createSessionsService.execute({
        username: "Victor",
        password: user.password,
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("Should not be able to create a new session --> Password not valid", async () => {
    const permission = await permissionRepository.create({
      name: "Permission Name",
      description: "Description Name",
    });

    const role = await roleRepository.create({
      name: "role name",
      description: "role description",
      permissions: [permission.id],
    });

    const user = await userRepository.create({
      name: "user name",
      username: "user username",
      password: "user password",
      roles: [role.id],
    });

    expect(
      createSessionsService.execute({
        username: user.password,
        password: "example_invalid_password",
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
