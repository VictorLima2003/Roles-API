import "dotenv/config";
import { Client } from "pg";

class Setup {
  async db_finish() {
    const client = new Client({
      connectionString: process.env.DATABASE_URL,
    });

    await client.connect();
    await client.query(`TRUNCATE TABLE "Permission" RESTART IDENTITY CASCADE;`);
    await client.query(`TRUNCATE TABLE "Role" RESTART IDENTITY CASCADE;`);
    await client.query(`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE;`);
    await client.query(`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE;`);
  }
}

export { Setup };
