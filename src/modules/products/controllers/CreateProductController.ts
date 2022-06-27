import { NextFunction, Request, Response } from "express";
import { CreateProductService } from "../services/CreateProductService";

class CreateProductController {
  createProductService: CreateProductService;

  constructor(createProductService: CreateProductService) {
    this.createProductService = createProductService;
  }

  async handle(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response> {
    const { name, description, price } = request.body;

    const product = await this.createProductService.execute({
      name,
      description,
      price,
    });

    return response.status(201).send(product);
  }
}

export { CreateProductController };
