import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import _ from 'lodash';

@Injectable()
export class SerializeInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        // Giả định rằng status và message là cố định, bạn có thể điều chỉnh theo yêu cầu của bạn
        return this.removePassword(data);
      }),
    );
  }

  private removePassword(data: any): any {
    if (_.isArray(data)) {
      return data.map((item) => this.removePassword(item));
    }
    if (_.isObject(data)) {
      const sanitizedData = _.cloneDeep(data);
      _.unset(sanitizedData, 'password');
      _.forEach(sanitizedData, (value, key) => {
        if (_.isObject(value)) {
          sanitizedData[key] = this.removePassword(value);
        }
      });
      return sanitizedData;
    }
    return data;
  }
}
