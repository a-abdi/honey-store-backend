import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Response } from 'src/interface/response';

@Injectable()
export class TransformResponse<T> implements NestInterceptor<T, Response<T>> {
  constructor(private reflector: Reflector) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    const message = this.reflector.getAllAndOverride<string>('responseMessage', [
      context.getHandler(),
      context.getClass(),
    ]);
    return next.handle().pipe(map(data => ({ 
      statusCode: context.switchToHttp().getResponse().statusCode,
      message,
      data: {
        result: data?.result || data,
        meta: data.meta
      }
    })));
  }
}