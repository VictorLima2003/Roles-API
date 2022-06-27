import { PermissionRepository } from "../repositories/prisma/PermissionRepository";
import { IPermissionRepository } from "../repositories/IPermissionRepository";
import { CreatePermissionService } from "../services/CreatePermissionService";
import { CreatePermissionController } from "../controllers/CreatePermissionController";

export const createPermissionFactory = () => {
  const permissionRepository: IPermissionRepository =
    new PermissionRepository();
  const createPermissionService = new CreatePermissionService(
    permissionRepository
  );
  const createPermissionController = new CreatePermissionController(
    createPermissionService
  );

  return createPermissionController;
};
