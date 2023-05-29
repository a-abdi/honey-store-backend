import { Module } from '@nestjs/common';
import { ViewpointService } from './viewpoint.service';
import { ViewpointController } from './viewpoint.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Viewpoint, ViewpointSchema } from './entities/viewpoint.entity';

@Module({
  controllers: [ViewpointController],
  providers: [ViewpointService],
  imports: [ 
    MongooseModule.forFeature([{ name: Viewpoint.name, schema: ViewpointSchema }])
  ]
})
export class ViewpointModule {}
