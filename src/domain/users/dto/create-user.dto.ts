import { Exclude, Transform } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { IsEmailUnique } from 'src/core/decorator/IsEmailUnique.decorator';
import { lowerCaseTransformer } from 'src/utils/transformers/lower-case.transformer';

export class CreateUserDto {
  @Transform(lowerCaseTransformer)
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(255)
  @IsString()
  @MinLength(8)
  @IsEmailUnique({ message: 'Email already exists' })
  email: string;

  @MaxLength(20)
  @MinLength(8)
  @IsString()
  @IsNotEmpty()
  @Exclude()
  password: string;

  @IsNotEmpty()
  username: string;

  @IsOptional()
  bio?: string | null;
}
