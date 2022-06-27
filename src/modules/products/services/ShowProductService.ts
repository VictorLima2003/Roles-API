import { Product } from "../model/Product";
import { IProductRepository } from "../repositories/IProductRepository";
import { IFindProduct } from "../dtos/IFindProduct";
import { AppError } from "../../../shared/errors/AppError";

class ShowProductService {
  productRepository: IProductRepository;

  constructor(productRepository: IProductRepository) {
    this.productRepository = productRepository;
  }

  async execute(props: IFindProduct): Promise<Product> {
    const product = await this.productRepository.findById(props.id);

    if (!product) {
      throw new AppError("Product not found. Verify id and try again");
    }

    return product;
  }
}

export { ShowProductService };
