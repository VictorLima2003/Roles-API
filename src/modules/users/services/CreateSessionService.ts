import { Session } from "../model/Session";
import { IUserRepository } from "../repositories/IUserRepository";
import { IEncoder } from "../../../providers/encoder/IEncoder";
import { ICreateSession } from "../dtos/ICreateSession";

import { AppError } from "../../../shared/errors/AppError";
import { sign, Secret } from "jsonwebtoken";
import authConfig from "../../../config/auth";

class CreateSessionService {
  userRepository: IUserRepository;
  encoder: IEncoder;

  constructor(userRepository: IUserRepository, encoder: IEncoder) {
    this.userRepository = userRepository;
    this.encoder = encoder;
  }

  async execute(props: ICreateSession): Promise<Session> {
    const user = await this.userRepository.findByUsername(props.username);

    if (!user) {
      throw new AppError("User not exists", 401);
    }

    const passwordConfirmed = await this.encoder.compareHash(
      props.password,
      user.password
    );

    if (!passwordConfirmed) {
      throw new AppError("Invalid password or username.", 401);
    }

    //ISOLAR JWT
    const token = sign({}, authConfig.jwt.secret as Secret, {
      subject: user.id,
      expiresIn: authConfig.jwt.expiresIn,
    });

    return {
      user,
      token,
    };
  }
}

export { CreateSessionService };
