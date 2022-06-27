import { createProductFactory } from "../factories/CreateProductFactory";
import { listAllProductsFactory } from "../factories/ListAllProdutsFactory";
import { showProductFactory } from "../factories/ShowProductFactory";
import { NextFunction, Request, Response, Router } from "express";
import isAuthenticated from "../../../shared/middlewares/isAuthenticated";
import { AuthRole } from "../../../shared/middlewares/AuthRole";
import { UserRepository } from "../../users/repositories/prisma/UserRepository";

const productRouter = Router();

productRouter.post(
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
    await createProductFactory().handle(request, response, next);
  }
);

productRouter.get(
  "/",
  isAuthenticated,
  async (request: Request, response: Response, next: NextFunction) => {
    const authRole = new AuthRole(
      ["ROLE_ADMIN", "ROLE_USER"],
      new UserRepository()
    ).verify(request, response, next);

    return authRole;
  },
  async (request: Request, response: Response, next: NextFunction) => {
    await listAllProductsFactory().handle(request, response, next);
  }
);

productRouter.get(
  "/:id",
  isAuthenticated,
  async (request: Request, response: Response, next: NextFunction) => {
    const authRole = new AuthRole(
      ["ROLE_ADMIN", "ROLE_USER"],
      new UserRepository()
    ).verify(request, response, next);

    return authRole;
  },
  async (request: Request, response: Response, next: NextFunction) => {
    await showProductFactory().handle(request, response, next);
  }
);

export { productRouter };
