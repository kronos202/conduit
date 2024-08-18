import {
  IsArray,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateArticleDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  title: string;

  @MaxLength(50)
  @MinLength(2)
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  @MinLength(8)
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsArray()
  tags: string[];
}
