import { PermissionRepositoryFake } from "../../modules/permissions/repositories/fakes/PermissionRepositoryFake";
import { IPermissionRepository } from "../../modules/permissions/repositories/IPermissionRepository";
import { RoleRepositoryFake } from "../../modules/roles/repositories/fakes/RoleRepositoryFake";
import { IRoleRepository } from "../../modules/roles/repositories/IRoleRepository";
import { UserRepositoryFake } from "../../modules/users/repositories/fakes/UserRepositoryFake";
import { IUserRepository } from "../../modules/users/repositories/IUserRepository";
import { CreateUserService } from "../../modules/users/services/CreateUserService";

import { ICreateUser } from "../../modules/users/dtos/ICreateUser";
import { AppError } from "../../shared/errors/AppError";
import { IEncoder } from "../../providers/encoder/IEncoder";
import { Encoder } from "../../providers/encoder/bcrypt/Encoder";

describe("CreateUserService", () => {
  let userRepository: IUserRepository;
  let roleRepository: IRoleRepository;
  let permissionRepository: IPermissionRepository;
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
  });

  it("Should have to access to userRepository", () => {
    expect(createUserService.userRepository).toBeDefined();
  });

  it("Should have to access to roleRepository", () => {
    expect(createUserService.roleRepository).toBeDefined();
  });

  it("Shoud have a method called execute", () => {
    expect(createUserService.execute).toBeDefined();
  });

  it("Should call the create method on the repository when the execute method on the service gets invoked", async () => {
    const spy = jest.spyOn(createUserService.roleRepository, "create");

    const permission = await permissionRepository.create({
      name: "Permission Name",
      description: "Description Name",
    });

    const roleData = await roleRepository.create({
      name: "role name",
      description: "role description",
      permissions: [permission.id],
    });

    const userData: ICreateUser = {
      name: "user name",
      username: "user description",
      password: "passoword",
      roles: [roleData.id],
    };

    await createUserService.execute(userData);

    expect(spy).toHaveBeenCalled();
  });

  it("Should call the findByIds method on the roleRepository when the execute method on the service gets invoked", async () => {
    const spy = jest.spyOn(createUserService.roleRepository, "findByIds");

    const permission = await permissionRepository.create({
      name: "Permission Name",
      description: "Description Name",
    });

    const role = await roleRepository.create({
      name: "role name",
      description: "role description",
      permissions: [permission.id],
    });

    const userData: ICreateUser = {
      name: "user name",
      username: "user description",
      password: "passoword",
      roles: [role.id],
    };

    await createUserService.execute(userData);

    expect(spy).toHaveBeenCalled();
  });

  it("Should be able to create a new user", async () => {
    const permission = await permissionRepository.create({
      name: "Permission Name",
      description: "Description Name",
    });

    const role = await roleRepository.create({
      name: "role name",
      description: "role description",
      permissions: [permission.id],
    });

    const userData: ICreateUser = {
      name: "user name",
      username: "user description",
      password: "passoword",
      roles: [role.id],
    };

    const user = await createUserService.execute(userData);

    expect(user).toHaveProperty("id");
  });

  it("Should be not able to create a new user --> role id not exists", async () => {
    const userData = {
      name: "user name",
      username: "user description",
      password: "passoword",
      roles: ["760fa27b-4d02-4834-8ece-011b9c553083"],
    };

    expect(createUserService.execute(userData)).rejects.toBeInstanceOf(
      AppError
    );
  });
});
