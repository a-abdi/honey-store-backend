import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Response } from 'src/interface/response';

@Injectable()
export class TransformResponse<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    return next.handle().pipe(map(data => ({ 
      statusCode: context.switchToHttp().getResponse().statusCode,
      message: data.message,
      data: {
        result: data.result,
        meta: data.meta
      }
    })));
  }
}