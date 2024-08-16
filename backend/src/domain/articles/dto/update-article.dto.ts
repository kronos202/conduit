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
  @MaxLength(100)
  title?: string;

  @MaxLength(20)
  @MinLength(8)
  @IsString()
  @IsNotEmpty()
  description?: string;

  @IsNotEmpty()
  @MinLength(8)
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
