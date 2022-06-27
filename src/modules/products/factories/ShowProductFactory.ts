import { ShowProductController } from "../controllers/ShowProductController";
import { ShowProductService } from "../services/ShowProductService";
import { IProductRepository } from "../repositories/IProductRepository";
import { ProductRepository } from "../repositories/prisma/ProductRepository";

export const showProductFactory = () => {
  const productRepository: IProductRepository = new ProductRepository();
  const showProductService = new ShowProductService(productRepository);
  const showProductController = new ShowProductController(showProductService);

  return showProductController;
};
