import { User } from "./user.type";

export interface Comments {
  content: string;
  author: User;
  createdAt: string;
  id: number;
  articleId: number;
  authorId: number;
}
