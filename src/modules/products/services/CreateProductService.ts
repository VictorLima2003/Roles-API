import { Product } from "../model/Product";
import { AppError } from "../../../shared/errors/AppError";
import { IProductRepository } from "../repositories/IProductRepository";
import { ICreateProduct } from "../dtos/ICreateProduct";

class CreateProductService {
  repository: IProductRepository;

  constructor(repository: IProductRepository) {
    this.repository = repository;
  }

  async execute(props: ICreateProduct): Promise<Product> {
    const productExists = await this.repository.findByName(props.name);

    if (productExists) {
      throw new AppError("name alread used");
    }

    const product = await this.repository.create(props);

    return product;
  }
}

export { CreateProductService };
