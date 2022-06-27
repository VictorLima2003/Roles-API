import { Permission } from "../../model/Permission";
import { IPermissionRepository } from "../IPermissionRepository";
import { v4 as uuid } from "uuid";

class PermissionRepositoryFake implements IPermissionRepository {
  private permissions: Permission[] = [];

  async create(props: Permission): Promise<Permission> {
    let permission: Permission = {
      id: uuid(),
      name: props.name,
      description: props.description,
    };

    this.permissions.push(permission);
    return permission;
  }

  async findByName(name: string): Promise<Permission | null> {
    const permission = this.permissions.find(
      (permission) => permission.name === name
    );

    if (!permission) {
      return null;
    }

    return permission;
  }

  async findById(id: string): Promise<Permission | null> {
    const permission = this.permissions.find(
      (permission) => permission.id === id
    );

    if (!permission) {
      return null;
    }

    return permission;
  }

  async findByIds(params: string[]): Promise<Permission[] | null> {
    let findPermissions: Permission[] = [];

    params.map((id) => {
      const item = this.permissions.find((permission) => permission.id === id);

      if (item) {
        findPermissions.push(item);
      }
    });

    if (findPermissions.length !== params.length) {
      return null;
    }

    return findPermissions;
  }
}

export { PermissionRepositoryFake };
