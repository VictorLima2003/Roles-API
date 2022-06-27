import { User } from "../model/User";
import { ICreateUser } from "../dtos/ICreateUser";
import { IUserRepository } from "../repositories/IUserRepository";
import { IRoleRepository } from "../../roles/repositories/IRoleRepository";
import { IEncoder } from "../../../providers/encoder/IEncoder";

import { AppError } from "../../../shared/errors/AppError";

class CreateUserService {
  userRepository: IUserRepository;
  roleRepository: IRoleRepository;
  encoder: IEncoder;

  constructor(
    userRepository: IUserRepository,
    roleRepository: IRoleRepository,
    encoder: IEncoder
  ) {
    this.userRepository = userRepository;
    this.roleRepository = roleRepository;
    this.encoder = encoder;
  }

  async execute(props: ICreateUser): Promise<User> {
    const userExists = await this.userRepository.findByUsername(props.username);

    if (userExists) {
      throw new AppError("Username alread used");
    }

    const rolesExists = await this.roleRepository.findByIds(props.roles);

    if (!rolesExists) {
      throw new AppError("Role is not valid. verify and try again");
    }

    const hashPassword = await await this.encoder.generateHash(props.password);

    const user = await this.userRepository.create({
      name: props.name,
      username: props.username,
      password: String(hashPassword),
      roles: props.roles,
    });

    return user;
  }
}

export { CreateUserService };
