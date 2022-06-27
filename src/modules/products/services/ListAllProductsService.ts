import { Product } from "../model/Product";
import { IProductRepository } from "../repositories/IProductRepository";

class ListAllProductsService {
  productRepository: IProductRepository;

  constructor(productRepository: IProductRepository) {
    this.productRepository = productRepository;
  }

  async execute(): Promise<Product[]> {
    const products = await this.productRepository.findAll();

    return products;
  }
}

export { ListAllProductsService };
