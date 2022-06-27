import { AppError } from "../../../shared/errors/AppError";
import { Permission } from "../model/Permission";
import { IPermissionRepository } from "../repositories/IPermissionRepository";
import { ICreatePermission } from "../dtos/ICreatePermission";

class CreatePermissionService {
  repository: IPermissionRepository;

  constructor(repository: IPermissionRepository) {
    this.repository = repository;
  }

  async execute(props: ICreatePermission): Promise<Permission> {
    const permissionExists = await this.repository.findByName(props.name);

    if (permissionExists) {
      throw new AppError("Permission name already used");
    }

    const permission = await this.repository.create(props);

    return permission;
  }
}

export { CreatePermissionService };
