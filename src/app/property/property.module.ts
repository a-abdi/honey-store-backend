import { Module } from '@nestjs/common';
import { PropertyService } from './property.service';
import { PropertyController } from './property.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Property, PropertySchema } from './entities/property.entity';

@Module({
  controllers: [PropertyController],
  providers: [PropertyService],
  imports: [
    MongooseModule.forFeature([{ name: Property.name, schema: PropertySchema }])
  ]
})
export class PropertyModule {}
