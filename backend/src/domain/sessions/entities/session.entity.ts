import { User } from '@prisma/client';

export class Session {
  id: number | string;
  user: User;
  hash: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}
