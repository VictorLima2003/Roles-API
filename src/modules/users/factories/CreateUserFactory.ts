import { IUserRepository } from "../repositories/IUserRepository";
import { UserRepository } from "../repositories/prisma/UserRepository";
import { CreateUserService } from "../services/CreateUserService";
import { Encoder } from "../../../providers/encoder/bcrypt/Encoder";
import { IEncoder } from "../../../providers/encoder/IEncoder";
import { CreateUserController } from "../controllers/CreateUserController";
import { IRoleRepository } from "../../roles/repositories/IRoleRepository";
import { RoleRepository } from "../../roles/repositories/prisma/RoleRepository";

export const createUserFactory = () => {
  const userRepository: IUserRepository = new UserRepository();
  const roleRepository: IRoleRepository = new RoleRepository();
  const encoder: IEncoder = new Encoder();
  const createUserService = new CreateUserService(
    userRepository,
    roleRepository,
    encoder
  );
  const createUserController = new CreateUserController(createUserService);

  return createUserController;
};
