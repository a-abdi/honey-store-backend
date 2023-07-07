import { Module } from "@nestjs/common";
import { PropertyFakerService } from "./property-faker.service";
import { PropertyModule } from "src/app/property/property.module";
import { AdminsModule } from "src/app/admins/admins.module";
import { CategoryFakerService } from "./category-faker.service";
import { CategoriesModule } from "src/app/categories/categories.module";
import { ProductFakerService } from "./product-faker.service";
import { ProductsModule } from "src/app/products/products.module";

@Module({
    imports: [
        PropertyModule,
        AdminsModule, 
        CategoriesModule,
        ProductsModule,
    ],
    providers: [
        PropertyFakerService,
        CategoryFakerService,
        ProductFakerService
    ],
})
export class FakerModule {}
