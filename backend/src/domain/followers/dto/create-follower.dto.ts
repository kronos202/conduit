import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateFollowerDto {
  @IsInt()
  @IsNotEmpty()
  followerId: number;

  @IsInt()
  @IsNotEmpty()
  followingId: number;
}
