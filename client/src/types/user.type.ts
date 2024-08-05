type Role = "user" | "admin";

export interface User {
  id: number;
  roles: Role[];
  email: string;
  username: string;
  createdAt: string;
  updatedAt: string;
}
