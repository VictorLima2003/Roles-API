import { CreatePermissionService } from "../../modules/permissions/services/CreatePermissionService";
import { IPermissionRepository } from "../../modules/permissions/repositories/IPermissionRepository";
import { PermissionRepositoryFake } from "../../modules/permissions/repositories/fakes/PermissionRepositoryFake";
import { AppError } from "../../shared/errors/AppError";

describe("CreatePermissionService", () => {
  let createPermissionService: CreatePermissionService;
  let repository: IPermissionRepository;

  beforeEach(() => {
    repository = new PermissionRepositoryFake();
    createPermissionService = new CreatePermissionService(repository);
  });

  it("Should have access to repository", () => {
    expect(createPermissionService.repository).toBeDefined();
  });

  it("Should call the create method on the repository when the execute method on the service gets invoked", async () => {
    const spy = jest.spyOn(createPermissionService.repository, "create");

    await createPermissionService.execute({
      name: "Permission name",
      description: "permission description",
    });

    expect(spy).toHaveBeenCalled();
  });

  it("Should be able to create a new permission", async () => {
    const response = await createPermissionService.execute({
      name: "Permission name",
      description: "permission description",
    });

    expect(response).toHaveProperty("id");
  });

  /*it("Should not be able do create a new permission", async () => {
    const permission = await createPermissionService.execute({
      name: "Permission name",
      description: "permission description",
    });

    expect(
      createPermissionService.execute({
        name: "Permission name",
        description: "permission description",
      })
    ).rejects.toBeInstanceOf(AppError);
  });*/
});
