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
    const hostAddress = `${request.protocol}://${request.get('host')}`;
    return next
      .handle()
      .pipe(
        map(response => {
          return mapResponse(response, this.key, hostAddress);
        })
      );
  };
};

const mapResponse = (response: any, key: string, hostAddress: string) => {
  if(Array.isArray(response) && response) {
    response.map(
      data => data[key] = (data[key] &&`${hostAddress}/${data[key]}`)
    );
  } else if(typeof response == 'object' && response) {
    response[key] = (response[key] && `${hostAddress}/${response[key]}`);
  }
  return response;
}