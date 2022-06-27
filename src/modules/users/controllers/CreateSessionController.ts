import { NextFunction, Request, Response } from "express";
import { CreateSessionService } from "../services/CreateSessionService";

class CreateSessionController {
  createSessionService: CreateSessionService;

  constructor(createSessionService: CreateSessionService) {
    this.createSessionService = createSessionService;
  }

  async handle(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response> {
    const { username, password } = request.body;

    const session = await this.createSessionService.execute({
      username,
      password,
    });

    return response.status(200).send(session);
  }
}

export { CreateSessionController };
