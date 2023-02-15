import { Controller, Request, Post, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './user-local-auth.guard';
import { UserAuthService } from './auth-user.service';

@Controller('auth')
export class UserAuthController {
  constructor(private authService: UserAuthService) {}
  
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login( req.user );
  }
}