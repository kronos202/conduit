import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Catch(PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
  catch(exception: PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    let errors = {
      message: 'Internal Server Error.',
    };
    console.log(exception);
    const targetFieldError = exception.meta?.cause ?? exception.meta?.target[0];

    // Handle different Prisma errors
    switch (exception.code) {
      case 'P2002': // Unique constraint failed
        statusCode = HttpStatus.CONFLICT;
        errors = {
          message: `${targetFieldError} đã được sử dụng.`,
        };

        break;
      case 'P2025': // Record not found
        statusCode = HttpStatus.NOT_FOUND;
        errors = {
          message: 'Not found.',
        };
        break;
      // Add more cases if needed
      default:
        errors = {
          message: 'Prisma error occurred.',
        };
    }

    response.status(statusCode).json({
      statusCode,
      errors,
    });
  }
}
