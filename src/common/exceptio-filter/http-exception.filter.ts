import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';
import { Message } from '../message';
import { ExceptionResponse } from './interface';
import { Name } from '../message/name';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse() as ExceptionResponse | string;
    let message = Message.ERROR_OCCURRED() as string | string[];
    if (typeof exceptionResponse === 'object') {
      switch (exceptionResponse?.message) {
        case 'Unauthorized': {
          if (request.path.includes('login')) {
            message = [ Message.NOT_BE_EMPTY(Name.USER_OR_PASS) ];
          } else {
            message = [ Message.UNAUTHORIZED() ];
          }
          break;
        }
        case 'Forbidden resource': {
          message = [ Message.FORBIDDEN_RESOURCE() ];
          break;
        }
        default: {
          message = exceptionResponse?.message;
          break;
        }
      }
    }

    response
      .status(status)
      .json({
        message,
        error: exception.message,
        statusCode: status,
    });
  }
}