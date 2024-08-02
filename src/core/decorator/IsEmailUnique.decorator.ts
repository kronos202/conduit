// import {
//   ValidatorConstraint,
//   ValidatorConstraintInterface,
//   ValidationArguments,
//   registerDecorator,
//   ValidationOptions,
// } from 'class-validator';
// import { Injectable } from '@nestjs/common';
// import { UsersService } from '../users/users.service';

// @Injectable()
// @ValidatorConstraint({ async: true })
// export class IsEmailUniqueConstraint implements ValidatorConstraintInterface {
//   constructor(private usersService: UsersService) {}

//   async validate(email: string, args: ValidationArguments) {
//     const user = await this.usersService.findByEmail(email);
//     return !user; // return true if the email is unique, false otherwise
//   }

//   defaultMessage(args: ValidationArguments) {
//     return 'Email $value already exists. Choose another email.';
//   }
// }

// export function IsEmailUnique(validationOptions?: ValidationOptions) {
//   return function (object: object, propertyName: string) {
//     registerDecorator({
//       target: object.constructor,
//       propertyName: propertyName,
//       options: validationOptions,
//       constraints: [],
//       validator: IsEmailUniqueConstraint,
//     });
//   };
// }
