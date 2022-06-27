import { ProductRepository } from "../repositories/prisma/ProductRepository";
import { IProductRepository } from "../repositories/IProductRepository";
import { ListAllProductsService } from "../services/ListAllProductsService";
import { ListAllProductsController } from "../controllers/ListAllProductsController";

export const listAllProductsFactory = () => {
  const productRepository: IProductRepository = new ProductRepository();
  const listAllProductService = new ListAllProductsService(productRepository);
  const listAllProductController = new ListAllProductsController(
    listAllProductService
  );

  return listAllProductController;
};
