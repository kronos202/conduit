import { PartialType } from '@nestjs/swagger';
import { CreateFollowerDto } from './create-follower.dto';
import { IsInt, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateFollowerDto extends PartialType(CreateFollowerDto) {
  @IsInt()
  @IsNotEmpty()
  @IsOptional()
  followerId: number;

  @IsInt()
  @IsNotEmpty()
  @IsOptional()
  followingId: number;
}
