import { User } from "../../model/User";
import { IUserRepository } from "../IUserRepository";
import { v4 as uuid } from "uuid";
import { Role } from "../../../roles/model/Role";
import { ICreateUser } from "../../dtos/ICreateUser";

class UserRepositoryFake implements IUserRepository {
  private users: User[] = [];

  async create(role_params: ICreateUser): Promise<User> {
    let rolesData: Role[] = [];

    role_params.roles.map((item) => {
      const data: Role = {
        id: item,
        name: "Example",
        description: "example description",
      };

      rolesData.push(data);
    });

    let user: User = {
      id: uuid(),
      name: role_params.name,
      username: role_params.username,
      password: role_params.password,
      roles: rolesData,
    };

    this.users.push(user);
    return user;
  }

  async findAll(): Promise<User[]> {
    return this.users;
  }

  async findById(id: string): Promise<User | null> {
    const user = this.users.find((user) => user.id === id);

    if (!user) {
      return null;
    }

    return user;
  }

  async findByUsername(username: string): Promise<User | null> {
    const user = this.users.find((user) => user.username === username);

    if (!user) {
      return null;
    }

    return user;
  }

  async findByIds(params: string[]): Promise<User[] | null> {
    let findUsers: User[] = [];

    params.map((id) => {
      const item = this.users.find((user) => user.id === id);

      if (item) {
        findUsers.push(item);
      }
    });

    if (findUsers.length !== params.length) {
      return null;
    }

    return findUsers;
  }
}

export { UserRepositoryFake };
