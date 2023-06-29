import { Injectable, OnApplicationBootstrap } from "@nestjs/common";
import { AdminsService } from "src/app/admins/admins.service";
import 'dotenv/config';

@Injectable()
export class AdminSeederService implements OnApplicationBootstrap {
    constructor(private readonly adminsService: AdminsService) {}

    async onApplicationBootstrap(): Promise<any> {
        const adminData = {
            phoneNumber: '+989394552776',
            password: '!QAZ1qaz' 
        };
        const admin = await this.adminsService.findByPhone(adminData.phoneNumber);
        if (!admin) { 
            this.adminsService.createSeed(adminData);
        }
    }
}