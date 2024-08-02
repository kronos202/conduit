import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateSessionDto {
  @IsInt()
  userId: number;

  @IsString()
  @IsNotEmpty()
  hash: string;
}
