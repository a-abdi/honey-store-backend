import { Module } from '@nestjs/common';
import { SmsService } from './sms.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  providers: [SmsService],
  imports: [HttpModule],
  exports: [SmsService]
})
export class SmsModule {}
