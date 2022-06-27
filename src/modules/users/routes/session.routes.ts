import { NextFunction, Request, Response, Router } from "express";
import { createSessionFactory } from "../factories/CreateSessionFactory";

const sessionRouter = Router();

sessionRouter.post(
  "/create",
  async (request: Request, response: Response, next: NextFunction) => {
    await createSessionFactory().handle(request, response, next);
  }
);

export { sessionRouter };
