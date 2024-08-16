import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { lowerCaseTransformer } from 'src/utils/transformers/lower-case.transformer';

export class CreateUserDto {
  @Transform(lowerCaseTransformer)
  @IsNotEmpty()
  @IsEmail()
  @IsString()
  @MinLength(8)
  email: string;

  @IsString()
  @IsOptional()
  @MinLength(8)
  password?: string;

  @IsNotEmpty()
  @MinLength(8)
  username: string;

  @IsOptional()
  bio?: string | null;

  @IsOptional()
  avatar?: string;

  @IsOptional()
  provider?: string;

  @IsOptional()
  socialId?: string | null;

  @IsOptional()
  hash?: string | null;

  @IsOptional()
  deletedAt?: Date | string | null;
}
