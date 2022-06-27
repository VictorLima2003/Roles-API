import { Response, Request, NextFunction } from "express";
import { ICreateUser } from "../dtos/ICreateUser";
import { CreateUserService } from "../services/CreateUserService";

class CreateUserController {
  createUserService: CreateUserService;

  constructor(createUserService: CreateUserService) {
    this.createUserService = createUserService;
  }

  async handle(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response> {
    const { name, username, password, roles }: ICreateUser = request.body;

    const user = await this.createUserService.execute({
      name,
      username,
      password,
      roles,
    });

    return response.status(201).send(user);
  }
}

export { CreateUserController };
