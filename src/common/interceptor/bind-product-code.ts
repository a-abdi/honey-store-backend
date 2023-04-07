import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class BindProductCode implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest<Request>();
    const code = (Math.random() + 1).toString(36).substring(2);
    request.body['code'] = code;
    return next.handle();
  };
};