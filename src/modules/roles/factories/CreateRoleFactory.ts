import { CreateRoleService } from "../services/CreateRoleService";
import { CreateRoleController } from "../controllers/CreateRoleController";
import { IRoleRepository } from "../repositories/IRoleRepository";
import { RoleRepository } from "../repositories/prisma/RoleRepository";
import { IPermissionRepository } from "../../permissions/repositories/IPermissionRepository";
import { PermissionRepository } from "../../permissions/repositories/prisma/PermissionRepository";

export const createRoleFactory = () => {
  const roleRepository: IRoleRepository = new RoleRepository();
  const permissionRepository: IPermissionRepository =
    new PermissionRepository();
  const createRoleService: CreateRoleService = new CreateRoleService(
    roleRepository,
    permissionRepository
  );
  const createRoleController = new CreateRoleController(createRoleService);

  return createRoleController;
};
