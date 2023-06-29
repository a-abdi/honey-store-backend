import { Module } from "@nestjs/common";
import { PropertyFakerService } from "./property-faker.service";
import { PropertyModule } from "src/app/property/property.module";
import { AdminsModule } from "src/app/admins/admins.module";
import { CategoryFakerService } from "./category-faker.service";
import { CategoriesModule } from "src/app/categories/categories.module";

@Module({
    imports: [
        PropertyModule,
        AdminsModule, 
        CategoriesModule,
    ],
    providers: [
        PropertyFakerService,
        CategoryFakerService,
    ],
})
export class FakerModule {}
