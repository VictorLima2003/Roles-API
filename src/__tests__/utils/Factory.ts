import { IPermissionRepository } from "../../modules/permissions/repositories/IPermissionRepository";
import { IRoleRepository } from "../../modules/roles/repositories/IRoleRepository";
import { IUserRepository } from "../../modules/users/repositories/IUserRepository";
import { IProductRepository } from "../../modules/products/repositories/IProductRepository";
import { ProductRepository } from "../../modules/products/repositories/prisma/ProductRepository";
import { RoleRepository } from "../../modules/roles/repositories/prisma/RoleRepository";
import { PermissionRepository } from "../../modules/permissions/repositories/prisma/PermissionRepository";
import { UserRepository } from "../../modules/users/repositories/prisma/UserRepository";
import { CreateUserService } from "../../modules/users/services/CreateUserService";
import { CreateSessionService } from "../../modules/users/services/CreateSessionService";
import { CreatePermissionService } from "../../modules/permissions/services/CreatePermissionService";
import { CreateRoleService } from "../../modules/roles/services/CreateRoleService";
import { CreateProductService } from "../../modules/products/services/CreateProductService";
import { ListAllProductsService } from "../../modules/products/services/ListAllProductsService";
import { ShowProductService } from "../../modules/products/services/ShowProductService";
import { IEncoder } from "../../providers/encoder/IEncoder";
import { Encoder } from "../../providers/encoder/bcrypt/Encoder";
import { Permission } from "../../modules/permissions/model/Permission";
import { Role } from "../../modules/roles/model/Role";
import { User } from "../../modules/users/model/User";
import { Session } from "../../modules/users/model/Session";
import { Product } from "../../modules/products/model/Product";
import { Prisma } from "@prisma/client";

interface IFactoryRole {
  name?: string;
  description?: string;
  permissionsId?: string[];
}

interface IFactoryUser {
  name?: string;
  username?: string;
  password?: string;
  rolesId?: string[];
}

class Factory {
  private encoder: IEncoder = new Encoder();
  private permissionRepository: IPermissionRepository =
    new PermissionRepository();
  private roleRepository: IRoleRepository = new RoleRepository();
  private userRepository: IUserRepository = new UserRepository();
  private productRepository: IProductRepository = new ProductRepository();

  private createUserService = new CreateUserService(
    this.userRepository,
    this.roleRepository,
    this.encoder
  );
  private createSessionService = new CreateSessionService(
    this.userRepository,
    this.encoder
  );
  private createPermissionService = new CreatePermissionService(
    this.permissionRepository
  );
  private createRoleService = new CreateRoleService(
    this.roleRepository,
    this.permissionRepository
  );
  private createProductService = new CreateProductService(
    this.productRepository
  );
  private listAllProductService = new ListAllProductsService(
    this.productRepository
  );
  private ShowProductService = new ShowProductService(this.productRepository);

  async factory_product({
    name = "Product",
    description = "product description",
    price = 10.0,
  }): Promise<Product> {
    const product = await this.createProductService.execute({
      name: name,
      description: description,
      price: price,
    });

    return product;
  }

  async factory_permission({
    name = "Permission",
    description = "permission description",
  }): Promise<Permission> {
    const permission = await this.createPermissionService.execute({
      name: name,
      description: description,
    });

    return permission;
  }

  async factory_role({
    name = "ROLE_ADMIN",
    description = "role description",
    permissionsId = [],
  }: IFactoryRole): Promise<Role> {
    let permissions: string[] = [];

    if (permissionsId.length === 0) {
      permissions.push((await this.factory_permission({})).id);
    } else {
      permissions = permissionsId;
    }

    const role = await this.createRoleService.execute({
      name: name,
      description: description,
      permissions: permissions,
    });

    return role;
  }

  async factory_user({
    name = "User",
    username = "user username",
    password = "user password",
    rolesId = [],
  }: IFactoryUser): Promise<User> {
    let roles: string[] = [];

    if (rolesId.length === 0) {
      roles.push((await this.factory_role({})).id);
    } else {
      roles = rolesId;
    }

    const user = await this.createUserService.execute({
      name: name,
      username: username,
      password: password,
      roles: roles,
    });

    return user;
  }

  async factory_session({
    username = "user username",
    password = "user password",
  }): Promise<Session> {
    const session = await this.createSessionService.execute({
      username: username,
      password: password,
    });

    return session;
  }
}

export { Factory };
