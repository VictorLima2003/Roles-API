import { NextFunction, Request, Response } from "express";
import { ListAllProductsService } from "../services/ListAllProductsService";

class ListAllProductsController {
  listAllProductsService: ListAllProductsService;

  constructor(listAllProductsService: ListAllProductsService) {
    this.listAllProductsService = listAllProductsService;
  }

  async handle(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response> {
    const products = await this.listAllProductsService.execute();

    return response.status(200).send(products);
  }
}

export { ListAllProductsController };
