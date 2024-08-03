import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
  ValidationOptions,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { UserService } from 'src/domain/users/user.service';

@Injectable()
@ValidatorConstraint({ async: true })
export class IsEmailUniqueConstraint implements ValidatorConstraintInterface {
  constructor(private usersService: UserService) {}

  async validate(email: string) {
    const user = await this.usersService.findOneOrFailByEmail(email);
    return !user; // return true if the email is unique, false otherwise
  }

  defaultMessage() {
    return 'Email $value already exists. Choose another email.';
  }
}

export function IsEmailUnique(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsEmailUniqueConstraint,
    });
  };
}
