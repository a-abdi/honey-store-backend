import { Module } from '@nestjs/common';
import { AdminsService } from './admins.service';
import { AdminsController } from './admins.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Admin, AdminSchema } from './entities/admin.entity';

@Module({
  controllers: [AdminsController],
  providers: [AdminsService],
  imports: [MongooseModule.forFeature([{name: Admin.name, schema: AdminSchema}])]
})

export class AdminsModule {}
