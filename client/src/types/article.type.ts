import { User } from "./user.type";

export interface Articles {
  content: string;
  title: string;
  description: string;
  tag: string[];
  slug: string;
  id: number;
  favoritedBy: User[];
  author: User[];
}
