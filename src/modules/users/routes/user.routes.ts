import { NextFunction, Request, Response, Router } from "express";
import { createUserFactory } from "../factories/CreateUserFactory";
import { AuthRole } from "../../../shared/middlewares/AuthRole";
import isAuthenticated from "../../../shared/middlewares/isAuthenticated";
import { UserRepository } from "../../users/repositories/prisma/UserRepository";

const userRouter = Router();

userRouter.post(
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
    await createUserFactory().handle(request, response, next);
  }
);

export { userRouter };
