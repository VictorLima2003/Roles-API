import { Permission } from "../../permissions/model/Permission";

interface Role {
  id: string;
  name: string;
  description: string;
  created_at?: Date;
  permissions?: Permission[];
}

export { Role };
