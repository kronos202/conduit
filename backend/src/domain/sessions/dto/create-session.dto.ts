import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateSessionDto {
  @IsInt()
  @IsNotEmpty()
  userId: number;

  @IsString()
  @IsNotEmpty()
  hash: string;
}
