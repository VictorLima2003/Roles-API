import { IProductRepository } from "../../modules/products/repositories/IProductRepository";
import { CreateProductService } from "../../modules/products/services/CreateProductService";
import { ProductRepositoryFake } from "../../modules/products/repositories/fakes/ProductRepositoryFake";
import { AppError } from "../../shared/errors/AppError";
import { Prisma } from "@prisma/client";
import { ICreateProduct } from "../../modules/products/dtos/ICreateProduct";

describe("CreateProductService", () => {
  let repository: IProductRepository;
  let createProductService: CreateProductService;

  beforeEach(() => {
    repository = new ProductRepositoryFake();
    createProductService = new CreateProductService(repository);
  });

  it("Should have access to repository", () => {
    expect(createProductService.repository).toBeDefined();
  });

  it("Should have a method called execute", () => {
    expect(createProductService.execute).toBeDefined();
  });

  it("Should call the create method on the repository when the execute method on the service gets invoked", async () => {
    const spy = jest.spyOn(createProductService.repository, "create");

    const productData: ICreateProduct = {
      name: "Product name",
      description: "product description",
      price: 12.0,
    };

    await createProductService.execute(productData);

    expect(spy).toHaveBeenCalled();
  });

  it("Should be able to create a new product", async () => {
    const productData: ICreateProduct = {
      name: "Product name",
      description: "product description",
      price: 12.0,
    };

    const product = await createProductService.execute(productData);

    expect(product).toHaveProperty("id");
  });

  it("Should not be able to create a new product", async () => {
    const productData: ICreateProduct = {
      name: "Product name",
      description: "product description",
      price: 12.0,
    };

    const product = await createProductService.execute(productData);

    expect(
      createProductService.execute({
        name: "Product name",
        description: "product description",
        price: 12.0,
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
