import { ICreatePermission } from "../dtos/ICreatePermission";
import { Permission } from "../model/Permission";

interface IPermissionRepository {
  create(params: ICreatePermission): Promise<Permission>;
  findByName(name: string): Promise<Permission | null>;
  findById(id: string): Promise<Permission | null>;
  findByIds(params: string[]): Promise<Permission[] | null>;
}

export { IPermissionRepository };
