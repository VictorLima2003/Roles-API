import { ProductRepositoryFake } from "../../modules/products/repositories/fakes/ProductRepositoryFake";
import { IProductRepository } from "../../modules/products/repositories/IProductRepository";
import { ProductRepository } from "../../modules/products/repositories/prisma/ProductRepository";
import { ListAllProductsService } from "../../modules/products/services/ListAllProductsService";

describe("ListAllProductsService", () => {
  let productRepository: IProductRepository;
  let listAllProductsService: ListAllProductsService;

  beforeEach(() => {
    productRepository = new ProductRepositoryFake();
    listAllProductsService = new ListAllProductsService(productRepository);
  });

  it("Should have access to product repository", () => {
    expect(listAllProductsService.execute).toBeDefined();
  });

  it("Should have a method called execute", () => {
    expect(listAllProductsService.execute).toBeDefined();
  });

  it("Should call the findAll method on the repository when the execute method on the service gets invoked", async () => {
    const spy = jest.spyOn(listAllProductsService.productRepository, "findAll");

    await listAllProductsService.execute();

    expect(spy).toHaveBeenCalled();
  });
});
