import { Module } from "@nestjs/common";
import 'dotenv/config';
import { AdminsModule } from "src/app/admins/admins.module";
import { AdminSeederService } from "./admin-seeder.service";

@Module({
    imports: [
        AdminsModule, 
    ],
    providers: [
        AdminSeederService,
    ],
})
export class SeederModule {}