import { CreateProductService } from "../services/CreateProductService";
import { ProductRepository } from "../repositories/prisma/ProductRepository";
import { IProductRepository } from "../repositories/IProductRepository";
import { CreateProductController } from "../controllers/CreateProductController";

export const createProductFactory = () => {
  const productRepository: IProductRepository = new ProductRepository();
  const createProductService = new CreateProductService(productRepository);
  const createProductController = new CreateProductController(
    createProductService
  );

  return createProductController;
};
