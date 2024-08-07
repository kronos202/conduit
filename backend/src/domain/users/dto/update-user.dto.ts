import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { lowerCaseTransformer } from 'src/utils/transformers/lower-case.transformer';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @Transform(lowerCaseTransformer)
  @IsNotEmpty()
  @IsEmail()
  @MinLength(8)
  @IsString()
  email: string;

  @MinLength(8)
  @IsString()
  @IsNotEmpty()
  password?: string;

  @IsNotEmpty()
  @MinLength(8)
  username?: string;

  @IsOptional()
  bio?: string | null;

  @IsOptional()
  avatar?: string;
}
