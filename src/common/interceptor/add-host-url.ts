import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface Response<T> {
  data: T;
};

@Injectable()
export class AddHostUrl<T> implements NestInterceptor<T, Response<T>> {
  constructor(private key: string) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    const request = context.switchToHttp().getRequest<Request>();
    const hostAddress = `${request.protocol}://${request.get('host')}`
    return next
      .handle()
      .pipe(
        map(response => {
          if(Array.isArray(response) && response) {
            response.map(
              data => data[this.key] = (data[this.key] &&`${hostAddress}/${data[this.key]}`)
            );
          } else if(typeof response == 'object' && response) {
            response[this.key] = (response[this.key] && `${hostAddress}/${response[this.key]}`);
          }
          return response;
        })
      );
  };
};