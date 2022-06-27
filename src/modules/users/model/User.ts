import { Role } from "../../roles/model/Role";

interface User {
  id: string;
  name: string;
  username: string;
  password: string;
  created_at?: Date;
  roles: Role[];
}

export { User };
