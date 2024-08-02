import { PartialType } from '@nestjs/swagger';
import { CreateTagDto } from './create-tag.dto';
import { IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateTagDto extends PartialType(CreateTagDto) {
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  name: string;
}
