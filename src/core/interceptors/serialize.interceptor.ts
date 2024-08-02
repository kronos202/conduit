import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, of, switchMap } from 'rxjs';
import * as _ from 'lodash';
import { User } from '@prisma/client';

@Injectable()
export class SerializeInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      switchMap((response) => {
        if (!response) return of(response);

        return of(this.formatResponse(response));
      }),
    );
  }

  formatResponse(response: any) {
    if (response instanceof Object) {
      delete response.password;

      return {
        status: 200,
        message: 'Success',
        data: _.isArray(response.items)
          ? response.items.map((user: User) => _.omit(user, ['password']))
          : _.omit(response, 'password'),
      };
    }

    return response;
  }
}
