import { NextFunction, Request, Response, Router } from "express";
import { createPermissionFactory } from "../factories/CreatePermissionFactory";
import { AuthRole } from "../../../shared/middlewares/AuthRole";
import isAuthenticated from "../../../shared/middlewares/isAuthenticated";
import { UserRepository } from "../../users/repositories/prisma/UserRepository";

const permissionRouter = Router();

permissionRouter.post(
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
  async (request, response, next: NextFunction) => {
    await createPermissionFactory().handle(request, response, next);
  }
);

export { permissionRouter };
