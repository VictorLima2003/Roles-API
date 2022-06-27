import { NextFunction, Request, Response, Router } from "express";
import { createRoleFactory } from "../factories/CreateRoleFactory";
import { AuthRole } from "../../../shared/middlewares/AuthRole";
import isAuthenticated from "../../../shared/middlewares/isAuthenticated";
import { UserRepository } from "../../users/repositories/prisma/UserRepository";

const roleRouter = Router();

roleRouter.post(
  "/create",
  isAuthenticated,
  async (request: Request, response: Response, next: NextFunction) => {
    const authRole = new AuthRole(["ROLE_ADMIN"], new UserRepository()).verify(
      request,
      response,
      next
    );

    return authRole;
  },
  async (request: Request, response: Response, next: NextFunction) => {
    await createRoleFactory().handle(request, response, next);
  }
);

export { roleRouter };
