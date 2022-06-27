import { NextFunction, Request, Response } from "express";
import { CreatePermissionService } from "../services/CreatePermissionService";

class CreatePermissionController {
  createPermissionService: CreatePermissionService;

  constructor(createPermissionService: CreatePermissionService) {
    this.createPermissionService = createPermissionService;
  }

  async handle(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response> {
    const { name, description } = request.body;

    const user = await this.createPermissionService.execute({
      name,
      description,
    });

    return response.status(201).send(user);
  }
}

export { CreatePermissionController };
