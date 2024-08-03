import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import _ from 'lodash';

@Injectable()
export class TransformResponseInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        if (!data) return { data: [] };

        if (data.data && data.meta) {
          return {
            meta: data.meta,
            status: 200,
            message: 'Success',
            data: this.removePassword(data),
          };
        }
        return {
          status: 200,
          message: 'Success',
          data: this.removePassword(data),
        };
      }),
    );
  }

  private removePassword(data: any): any {
    if (_.isArray(data)) {
      return data.map((item) => this.removePassword(item));
    }
    if (_.isObject(data)) {
      // Tạo một bản sao của đối tượng để tránh thay đổi đối tượng gốc
      const sanitizedData = _.cloneDeep(data);

      // Xóa trường password nếu có
      _.unset(sanitizedData, 'password');

      // Xử lý các thuộc tính con của đối tượng
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
