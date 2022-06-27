import { IProductRepository } from "../../modules/products/repositories/IProductRepository";
import { ProductRepositoryFake } from "../../modules/products/repositories/fakes/ProductRepositoryFake";
import { ShowProductService } from "../../modules/products/services/ShowProductService";
import { CreateProductService } from "../../modules/products/services/CreateProductService";
import { Prisma } from "@prisma/client";
import { AppError } from "../../shared/errors/AppError";

describe("ShowProductService", () => {
  let productRepository: IProductRepository;
  let createProductService: CreateProductService;
  let showProductService: ShowProductService;

  beforeEach(() => {
    productRepository = new ProductRepositoryFake();
    createProductService = new CreateProductService(productRepository);
    showProductService = new ShowProductService(productRepository);
  });

  it("Should have access to repository", () => {
    expect(showProductService.productRepository).toBeDefined();
  });

  it("Should have a method called execute", () => {
    expect(showProductService.execute).toBeDefined();
  });

  it("Should call the findById method on the repository when the execute method on the service gets invoked", async () => {
    const spy = jest.spyOn(showProductService.productRepository, "findById");

    const product = await createProductService.execute({
      name: "product example",
      description: "description product",
      price: 30.99,
    });

    await showProductService.execute({ id: product.id });

    expect(spy).toHaveBeenCalled();
  });

  it("Should be able to find a product by id", async () => {
    const createdProduct = await createProductService.execute({
      name: "product example",
      description: "description product",
      price: 30.99,
    });

    const product = await showProductService.execute({ id: createdProduct.id });

    expect(product.id).toBe(createdProduct.id);
  });

  it("Should not be able to find a product by id", async () => {
    expect(
      showProductService.execute({
        id: "8c194b6f-505f-4639-9111-a2ea78378b31",
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
