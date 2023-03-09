import { Controller, Request, Post, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './admin-local-auth.guard';
import { AdminAuthService } from './auth-admin.service';

@Controller('auth-admin')
export class AdminAuthController {
  constructor(private authService: AdminAuthService) {}
  
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login( req.user );
  }
}