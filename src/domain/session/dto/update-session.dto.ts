import { PartialType } from '@nestjs/swagger';
import { CreateSessionDto } from './create-session.dto';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateSessionDto extends PartialType(CreateSessionDto) {
  @IsOptional()
  @IsString()
  hash?: string;

  @IsOptional()
  @IsInt()
  userId?: number;
}
