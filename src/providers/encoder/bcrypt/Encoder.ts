import { IEncoder } from "../IEncoder";
import { compare, hash } from "bcryptjs";

class Encoder implements IEncoder {
  public async generateHash(payload: string): Promise<string> {
    return hash(payload, 8);
  }

  public async compareHash(payload: string, hashed: string): Promise<boolean> {
    return compare(payload, hashed);
  }
}

export { Encoder };
