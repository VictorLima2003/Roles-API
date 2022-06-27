import { IRoleRepository } from "../repositories/IRoleRepository";
import { Role } from "../model/Role";
import { IPermissionRepository } from "../../permissions/repositories/IPermissionRepository";
import { ICreateRole } from "../dtos/ICreateRole";

import { AppError } from "../../../shared/errors/AppError";

class CreateRoleService {
  roleRepository: IRoleRepository;
  permissionRepository: IPermissionRepository;

  constructor(
    roleRepository: IRoleRepository,
    permissionRepository: IPermissionRepository
  ) {
    this.roleRepository = roleRepository;
    this.permissionRepository = permissionRepository;
  }

  async execute(props: ICreateRole): Promise<Role> {
    const roleExists = await this.roleRepository.findByName(props.name);

    if (roleExists) {
      throw new AppError("Role name already exists");
    }

    const permissionsExists = await this.permissionRepository.findByIds(
      props.permissions
    );

    if (!permissionsExists) {
      throw new AppError("Unable to create role. Permission does not exist");
    }

    const role = await this.roleRepository.create(props);

    return role;
  }
}

export { CreateRoleService };
