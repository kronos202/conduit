import { PartialType } from '@nestjs/swagger';
import { CreateArticleDto } from './create-article.dto';
import {
  IsArray,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateArticleDto extends PartialType(CreateArticleDto) {
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(50)
  title?: string;

  @MaxLength(50)
  @MinLength(8)
  @IsString()
  @IsNotEmpty()
  description?: string;

  @IsNotEmpty()
  @IsString()
  content?: string;

  @IsNotEmpty()
  @IsString()
  slug?: string;

  @IsNotEmpty()
  @IsArray()
  tags?: string[];

  @IsNotEmpty()
  deletedAt?: string | null | Date;
}
