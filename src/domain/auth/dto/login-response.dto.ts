import { User } from '@prisma/client';

export class LoginResponseDto {
  token: string;

  refreshToken: string;

  tokenExpires: number;

  user: User;
}
