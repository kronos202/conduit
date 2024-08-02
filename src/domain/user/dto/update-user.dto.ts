import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { lowerCaseTransformer } from 'src/utils/transformers/lower-case.transformer';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @Transform(lowerCaseTransformer)
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(255)
  @IsString()
  @MinLength(8)
  email: string;

  @MaxLength(20)
  @MinLength(8)
  @IsString()
  @IsNotEmpty()
  password?: string;

  @IsNotEmpty()
  username?: string;

  @IsOptional()
  bio?: string | null;
}
