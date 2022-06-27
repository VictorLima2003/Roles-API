import { Role } from "../../model/Role";
import { IRoleRepository } from "../IRoleRepository";
import { prisma } from "../../../../../prisma/database/index";
import { Permission } from "../../../permissions/model/Permission";
import { ICreateRole } from "../../dtos/ICreateRole";

interface IPermissionsData {
  permissionId: string;
}

class RoleRepository implements IRoleRepository {
  async create(role_params: ICreateRole): Promise<Role> {
    let permissionsData: IPermissionsData[] = [];

    role_params.permissions.map((item) => {
      const data: IPermissionsData = {
        permissionId: item,
      };

      permissionsData.push(data);
    });

    const role = await prisma.role.create({
      data: {
        name: role_params.name,
        description: role_params.description,
        permissions: {
          createMany: {
            data: permissionsData,
          },
        },
      },
      include: {
        permissions: {
          include: {
            permission: true,
          },
        },
      },
    });

    const response = {
      ...role,
      permissions: role.permissions.map((permission) => permission.permission),
    };

    return response;
  }

  async findAll(): Promise<Role[]> {
    const roles = await prisma.role.findMany({
      include: {
        permissions: {
          include: {
            permission: true,
          },
        },
      },
    });

    let response: Role[] = [];

    roles.map((role) => {
      response.push({
        ...role,
        permissions: role.permissions.map(
          (permission) => permission.permission
        ),
      });
    });

    return response;
  }

  async findById(id: string): Promise<Role | null> {
    const role = await prisma.role.findUnique({
      where: {
        id: id,
      },
      include: {
        permissions: {
          include: {
            permission: true,
          },
        },
      },
    });

    if (!role) {
      return null;
    }

    const response = {
      ...role,
      permissions: role.permissions.map((permission) => permission.permission),
    };

    return response;
  }

  async findByName(name: string): Promise<Role | null> {
    const role = await prisma.role.findUnique({
      where: {
        name: name,
      },
      include: {
        permissions: {
          include: {
            permission: true,
          },
        },
      },
    });

    if (!role) {
      return null;
    }

    const response = {
      ...role,
      permissions: role.permissions.map((permission) => permission.permission),
    };

    return response;
  }

  async findByIds(params: string[]): Promise<Role[] | null> {
    const roles = await prisma.role.findMany({
      where: {
        id: {
          in: params,
        },
      },
      include: {
        permissions: {
          include: {
            permission: true,
          },
        },
      },
    });

    if (roles.length !== params.length) {
      return null;
    }

    let response: Role[] = [];

    roles.map((role) => {
      response.push({
        ...role,
        permissions: role.permissions.map(
          (permission) => permission.permission
        ),
      });
    });

    return response;
  }
}

export { RoleRepository };
