import { Global, Module } from '@nestjs/common';
import { AdminsService } from './admins.service';
import { AdminsController } from './admins.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Admin, AdminMiddleware, AdminSchema } from './entities/admin.entity';
import { IsPhoneAlreadyExist } from './service/is-phone-already-exist';

@Module({
  controllers: [AdminsController],
  providers: [AdminsService, IsPhoneAlreadyExist],
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Admin.name,
        useFactory: () => {
          const schema = AdminSchema;
          AdminMiddleware();
          return schema;
        }
      }
    ])
  ],
  exports: [AdminsService]
})

export class AdminsModule {}
