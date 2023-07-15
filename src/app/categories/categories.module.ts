import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchema } from './entities/category.entity';
import { CategoryNameUnique } from './service/category-name-unique';
import { UrlHelper } from 'src/common/helper/url.helper';
import { HostAddress } from './helper/host-address';

@Module({
  controllers: [CategoriesController],
  providers: [CategoriesService, CategoryNameUnique, UrlHelper, HostAddress],
  imports: [
    MongooseModule.forFeature([{name: Category.name, schema: CategorySchema}])
  ],
  exports: [
    CategoriesService
  ]
})
export class CategoriesModule {}
