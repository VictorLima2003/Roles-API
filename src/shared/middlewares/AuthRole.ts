import { NextFunction, Request, Response } from "express";
import { IUserRepository } from "../../modules/users/repositories/IUserRepository";
import { UserRepository } from "../../modules/users/repositories/prisma/UserRepository";
import { AppError } from "../errors/AppError";

class AuthRole {
  roles: string[];
  userRepository: IUserRepository;

  constructor(roles: string[], userRepository: IUserRepository) {
    this.roles = roles;
    this.userRepository = userRepository;
  }

  async verify(request: Request, response: Response, next: NextFunction) {
    const userId = request.user.id;

    const user = await this.userRepository.findById(userId);

    const existsRoles = user?.roles?.some((r) => this.roles.includes(r.name));

    if (!existsRoles) {
      throw new AppError(
        "Access denied. This user cannot access the route.",
        403
      );
    }

    return next();
  }
}

export { AuthRole };
