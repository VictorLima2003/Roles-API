import { Product } from "../../model/Product";
import { IProductRepository } from "../IProductRepository";
import { v4 as uuid } from "uuid";
import { ICreateProduct } from "../../dtos/ICreateProduct";

class ProductRepositoryFake implements IProductRepository {
  private products: Product[] = [];

  async create(props: ICreateProduct): Promise<Product> {
    let product: Product = {
      id: uuid(),
      name: props.name,
      description: props.description,
      price: props.price,
    };

    this.products.push(product);
    return product;
  }

  async findByName(name: string): Promise<Product | null> {
    const product = this.products.find((product) => product.name === name);

    if (!product) {
      return null;
    }

    return product;
  }

  async findById(id: string): Promise<Product | null> {
    const product = this.products.find((product) => product.id === id);

    if (!product) {
      return null;
    }

    return product;
  }

  async findByIds(params: string[]): Promise<Product[] | null> {
    let findProducts: Product[] = [];

    params.map((id) => {
      const item = this.products.find((product) => product.id === id);

      if (item) {
        findProducts.push(item);
      }
    });

    if (findProducts.length !== params.length) {
      return null;
    }

    return findProducts;
  }

  async findAll(): Promise<Product[]> {
    return this.products;
  }
}

export { ProductRepositoryFake };
