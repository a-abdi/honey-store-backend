import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Request } from 'express';
import { createRandomCode } from '../helper';

@Injectable()
export class BindProductCode implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest<Request>();
    const code = createRandomCode();
    request.body['code'] = code;
    return next.handle();
  };
};