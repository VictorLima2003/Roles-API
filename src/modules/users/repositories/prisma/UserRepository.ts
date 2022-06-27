import { prisma } from "../../../../../prisma/database";
import { ICreateUser } from "../../dtos/ICreateUser";
import { User } from "../../model/User";
import { IUserRepository } from "../IUserRepository";

interface IRoleData {
  roleId: string;
}

class UserRepository implements IUserRepository {
  async create(props: ICreateUser): Promise<User> {
    let rolesData: IRoleData[] = [];

    props.roles.map((item) => {
      const data: IRoleData = {
        roleId: item,
      };

      rolesData.push(data);
    });

    const user = await prisma.user.create({
      data: {
        name: props.name,
        username: props.username,
        password: props.password,
        roles: {
          createMany: {
            data: rolesData,
          },
        },
      },
      include: {
        roles: {
          include: {
            role: true,
          },
        },
      },
    });

    const response = {
      ...user,
      roles: user.roles.map((role) => role.role),
    };

    return response;
  }

  async findByUsername(username: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        username: username,
      },
      include: {
        roles: {
          include: {
            role: true,
          },
        },
      },
    });

    if (!user) {
      return null;
    }

    const response = {
      ...user,
      roles: user.roles.map((role) => role.role),
    };

    return response;
  }

  async findById(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
      include: {
        roles: {
          include: {
            role: true,
          },
        },
      },
    });

    if (!user) {
      return null;
    }

    const response = {
      ...user,
      roles: user.roles.map((role) => role.role),
    };

    return response;
  }

  async findAll(): Promise<User[]> {
    const users = await prisma.user.findMany({
      include: {
        roles: {
          include: {
            role: true,
          },
        },
      },
    });

    let response: User[] = [];

    users.map((user) => {
      response.push({
        ...user,
        roles: user.roles.map((role) => role.role),
      });
    });

    return response;
  }
}

export { UserRepository };
