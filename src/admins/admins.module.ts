import { Global, Module } from '@nestjs/common';
import { AdminsService } from './admins.service';
import { AdminsController } from './admins.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Admin, AdminSchema } from './entities/admin.entity';
import { RolesGuard } from 'src/auth/roles.guard';
import { APP_GUARD } from '@nestjs/core';

@Global()
@Module({
  controllers: [AdminsController],
  providers: [AdminsService],
  imports: [MongooseModule.forFeature([{name: Admin.name, schema: AdminSchema}])],
  exports: [AdminsService]
})

export class AdminsModule {}
