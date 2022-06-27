import { CreateSessionService } from "../services/CreateSessionService";
import { CreateSessionController } from "../controllers/CreateSessionController";
import { UserRepository } from "../repositories/prisma/UserRepository";
import { IUserRepository } from "../repositories/IUserRepository";
import { IEncoder } from "../../../providers/encoder/IEncoder";
import { Encoder } from "../../../providers/encoder/bcrypt/Encoder";

export const createSessionFactory = () => {
  const userRepository: IUserRepository = new UserRepository();
  const encoder: IEncoder = new Encoder();
  const createSessionService = new CreateSessionService(
    userRepository,
    encoder
  );
  const createSessionController = new CreateSessionController(
    createSessionService
  );

  return createSessionController;
};
