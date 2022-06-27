import { Product } from "../model/Product";
import { ICreateProduct } from "../dtos/ICreateProduct";

interface IProductRepository {
  create(params: ICreateProduct): Promise<Product>;
  findByName(name: string): Promise<Product | null>;
  findById(id: string): Promise<Product | null>;
  findByIds(params: string[]): Promise<Product[] | null>;
  findAll(): Promise<Product[]>;
}

export { IProductRepository };
