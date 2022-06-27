import { NextFunction, Request, Response } from "express";
import { ShowProductService } from "../services/ShowProductService";

class ShowProductController {
  showProductService: ShowProductService;

  constructor(showProductService: ShowProductService) {
    this.showProductService = showProductService;
  }

  async handle(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response> {
    const { id } = request.params;

    const product = await this.showProductService.execute({ id });

    return response.status(200).send(product);
  }
}

export { ShowProductController };
