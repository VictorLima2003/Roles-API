import { Role } from "../../model/Role";
import { IRoleRepository } from "../IRoleRepository";
import { v4 as uuid } from "uuid";
import { Permission } from "../../../permissions/model/Permission";
import { ICreateRole } from "../../dtos/ICreateRole";

class RoleRepositoryFake implements IRoleRepository {
  private roles: Role[] = [];

  async create(role_params: ICreateRole): Promise<Role> {
    let permissionsData: Permission[] = [];

    role_params.permissions.map((item) => {
      const data: Permission = {
        id: item,
        name: "Example",
        description: "example description",
      };

      permissionsData.push(data);
    });

    let role: Role = {
      id: uuid(),
      name: role_params.name,
      description: role_params.description,
      permissions: permissionsData,
    };

    this.roles.push(role);
    return role;
  }

  async findAll(): Promise<Role[]> {
    return this.roles;
  }

  async findById(id: string): Promise<Role | null> {
    const role = this.roles.find((role) => role.id === id);

    if (!role) {
      return null;
    }

    return role;
  }

  async findByName(name: string): Promise<Role | null> {
    const role = this.roles.find((role) => role.name === name);

    if (!role) {
      return null;
    }

    return role;
  }

  async findByIds(params: string[]): Promise<Role[] | null> {
    let findRoles: Role[] = [];

    params.map((id) => {
      const item = this.roles.find((role) => role.id === id);

      if (item) {
        findRoles.push(item);
      }
    });

    if (findRoles.length !== params.length) {
      return null;
    }

    return findRoles;
  }
}

export { RoleRepositoryFake };
