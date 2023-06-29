import { Module } from "@nestjs/common";
import 'dotenv/config';
import { PropertyFakerService } from "./property-faker.service";
import { PropertyModule } from "src/app/property/property.module";
import { CategoriesModule } from "src/app/categories/categories.module";
import { AdminsModule } from "src/app/admins/admins.module";

@Module({
    imports: [
        PropertyModule,
        AdminsModule, 
        // CategoriesModule
    ],
    providers: [
        PropertyFakerService,
    ],
})
export class FakerModule {}
