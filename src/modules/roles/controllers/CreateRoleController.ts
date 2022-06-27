import { NextFunction, Request, response, Response } from "express";
import { CreateRoleService } from "../services/CreateRoleService";

class CreateRoleController {
  createRoleService: CreateRoleService;

  constructor(createRoleService: CreateRoleService) {
    this.createRoleService = createRoleService;
  }

  async handle(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response> {
    const { name, description, permissions } = request.body;

    const role = await this.createRoleService.execute({
      name,
      description,
      permissions,
    });

    return response.status(201).send(role);
  }
}

export { CreateRoleController };
