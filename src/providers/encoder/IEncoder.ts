interface IEncoder {
  generateHash(password: string): Promise<String>;
  compareHash(passord: string, password_hashed: string): Promise<Boolean>;
}

export { IEncoder };
