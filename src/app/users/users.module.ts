import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserMiddleware, UserSchema } from './entities/user.entity';
import { IsPhoneAlreadyExist } from './service/is-phone-already-exist';

@Module({
  controllers: [UsersController],
  providers: [UsersService, IsPhoneAlreadyExist],
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        useFactory: () => {
          const schema = UserSchema;
          UserMiddleware();
          return schema;
        }
      }
    ])
  ],
  exports: [UsersService]
})
export class UsersModule {}
