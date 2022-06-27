import { Permission } from "../../model/Permission";
import { IPermissionRepository } from "../IPermissionRepository";
import { prisma } from "../../../../../prisma/database/index";
import { ICreatePermission } from "../../dtos/ICreatePermission";

class PermissionRepository implements IPermissionRepository {
  async create(permission: ICreatePermission): Promise<Permission> {
    const response = await prisma.permission.create({
      data: {
        name: permission.name,
        description: permission.description,
      },
    });

    return response;
  }

  async findByName(name: string): Promise<Permission | null> {
    const response = await prisma.permission.findUnique({
      where: {
        name: name,
      },
    });

    return response;
  }

  async findById(id: string): Promise<Permission | null> {
    const response = await prisma.permission.findUnique({
      where: {
        id: id,
      },
    });

    return response;
  }

  async findByIds(params: string[]): Promise<Permission[] | null> {
    const permissions = await prisma.permission.findMany({
      where: {
        id: {
          in: params,
        },
      },
    });

    if (permissions.length !== params.length) {
      return null;
    }

    return permissions;
  }
}

export { PermissionRepository };
