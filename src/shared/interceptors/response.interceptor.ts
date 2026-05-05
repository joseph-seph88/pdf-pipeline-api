import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T> {
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<unknown> {
    const response = context.switchToHttp().getResponse();

    return next.handle().pipe(
      map((data) => ({
        status_code: response.statusCode,
        status_type: 'SUCCESS',
        data,
      })),
    );
  }
}
