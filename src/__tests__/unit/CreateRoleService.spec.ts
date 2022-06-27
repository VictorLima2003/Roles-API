import { IRoleRepository } from "../../modules/roles/repositories/IRoleRepository";
import { CreateRoleService } from "../../modules/roles/services/CreateRoleService";
import { RoleRepositoryFake } from "../../modules/roles/repositories/fakes/RoleRepositoryFake";
import { AppError } from "../../shared/errors/AppError";
import { PermissionRepositoryFake } from "../../modules/permissions/repositories/fakes/PermissionRepositoryFake";
import { IPermissionRepository } from "../../modules/permissions/repositories/IPermissionRepository";

import { ICreateRole } from "../../modules/roles/dtos/ICreateRole";
import { ICreatePermission } from "../../modules/permissions/dtos/ICreatePermission";

describe("CreateRoleService", () => {
  let createRoleService: CreateRoleService;
  let permissionRepository: IPermissionRepository;
  let roleRepository: IRoleRepository;

  beforeEach(() => {
    roleRepository = new RoleRepositoryFake();
    permissionRepository = new PermissionRepositoryFake();
    createRoleService = new CreateRoleService(
      roleRepository,
      permissionRepository
    );
  });

  it("Should be access to repository", () => {
    expect(createRoleService.roleRepository).toBeDefined();
  });

  it("Should be access to permission respository", () => {
    expect(createRoleService.permissionRepository).toBeDefined();
  });

  it("Shoud have a method called execute", () => {
    expect(createRoleService.execute).toBeDefined();
  });

  it("Should call the create method on the repository when the execute method on the service gets invoked", async () => {
    const spy = jest.spyOn(createRoleService.roleRepository, "create");

    const permission = await permissionRepository.create({
      name: "Permission Name",
      description: "Description Name",
    });

    const roleData: ICreateRole = {
      name: "role name",
      description: "role description",
      permissions: [permission.id],
    };

    await createRoleService.execute(roleData);

    expect(spy).toHaveBeenCalled();
  });

  it("Should call the findByIds method on the permissionRepository when the execute method on the service gets invoked", async () => {
    const spy = jest.spyOn(createRoleService.permissionRepository, "findByIds");

    const permission = await permissionRepository.create({
      name: "Permission Name",
      description: "Description Name",
    });

    const roleData = {
      name: "role name",
      description: "role description",
      permissions: [permission.id],
    };

    await createRoleService.execute(roleData);

    expect(spy).toHaveBeenCalled();
  });

  it("Should be able to create a new role", async () => {
    const permission = await permissionRepository.create({
      name: "Permission Name",
      description: "Description Name",
    });

    const roleData = {
      name: "role name",
      description: "role description",
      permissions: [permission.id],
    };

    const role = await createRoleService.execute(roleData);

    expect(role).toHaveProperty("id");
  });

  it("Should be not able to create a new role --> role name in use", async () => {
    const permission = await permissionRepository.create({
      name: "Permission Name",
      description: "Description Name",
    });

    const roleData = {
      name: "role name",
      description: "role description",
      permissions: [permission.id],
    };

    const role = await createRoleService.execute(roleData);

    expect(createRoleService.execute(roleData)).rejects.toBeInstanceOf(
      AppError
    );
  });

  it("Should be not able to create a new role --> permission id not exists", async () => {
    const roleData = {
      name: "role name",
      description: "role description",
      permissions: ["760fa27b-4d02-4834-8ece-011b9c553083"],
    };

    expect(createRoleService.execute(roleData)).rejects.toBeInstanceOf(
      AppError
    );
  });
});
