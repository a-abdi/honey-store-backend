import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
export class SelfUser implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const {user} = context.switchToHttp().getRequest();
    const param = context.switchToHttp().getRequest().params;
    return user.adminId === param._id;
  }
}