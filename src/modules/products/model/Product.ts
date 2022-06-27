import { Prisma } from "@prisma/client";

interface Product {
  id: string;
  name: string;
  description: string;
  price: Prisma.Decimal | number;
  created_at?: Date;
}

export { Product };
