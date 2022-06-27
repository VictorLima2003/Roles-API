import { ICreateUser } from "../dtos/ICreateUser";
import { User } from "../../users/model/User";

interface IUserRepository {
  create(props: ICreateUser): Promise<User>;
  findByUsername(username: string): Promise<User | null>;
  findAll(): Promise<User[]>;
  findById(id: string): Promise<User | null>;
}

export { IUserRepository };
