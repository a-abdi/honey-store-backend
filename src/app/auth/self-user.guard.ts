import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Role } from '../../common/declare/enum';

@Injectable()
export class SelfUser implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const {user} = context.switchToHttp().getRequest();
    const param = context.switchToHttp().getRequest().params;
    if(user.roles?.includes(Role.Admin)) {
      return true;
    }
    return user?.userId === param._id;
  }
}