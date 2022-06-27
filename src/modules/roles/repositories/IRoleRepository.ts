import { ICreateRole } from "../dtos/ICreateRole";
import { Role } from "../model/Role";

interface IRoleRepository {
  create(role_params: ICreateRole): Promise<Role>;
  findById(id: string): Promise<Role | null>;
  findByIds(params: (string | undefined)[]): Promise<Role[] | null>;
  findByName(name: string): Promise<Role | null>;
  findAll(): Promise<Role[]>;
}

export { IRoleRepository };
