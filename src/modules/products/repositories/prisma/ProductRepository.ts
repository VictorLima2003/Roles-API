import { Prisma } from "@prisma/client";
import { prisma } from "../../../../../prisma/database/index";
import { ICreateProduct } from "../../dtos/ICreateProduct";
import { Product } from "../../model/Product";
import { IProductRepository } from "../IProductRepository";

class ProductRepository implements IProductRepository {
  async create(params: ICreateProduct): Promise<Product> {
    const response = await prisma.product.create({
      data: {
        name: params.name,
        description: params.description,
        price: new Prisma.Decimal(params.price),
      },
    });

    return response;
  }

  async findAll(): Promise<Product[]> {
    const response = await prisma.product.findMany();

    return response;
  }

  async findById(id: string): Promise<Product | null> {
    const response = await prisma.product.findUnique({
      where: {
        id: id,
      },
    });

    return response;
  }

  async findByIds(params: string[]): Promise<Product[] | null> {
    const response = await prisma.product.findMany({
      where: {
        id: {
          in: params,
        },
      },
    });

    if (response.length !== params.length) {
      return null;
    }

    return response;
  }

  async findByName(name: string): Promise<Product | null> {
    const response = await prisma.product.findUnique({
      where: {
        name: name,
      },
    });

    return response;
  }
}

export { ProductRepository };
