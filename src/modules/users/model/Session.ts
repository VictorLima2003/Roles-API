import { User } from "./User";

interface Session {
  user: User;
  token: string;
}

export { Session };
