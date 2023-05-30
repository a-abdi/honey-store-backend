import { Injectable } from "@nestjs/common";
import { UsersService } from "src/app/users/users.service";
import * as bcrypt from 'bcrypt';

@Injectable()
export class Password {
    constructor(private readonly userService: UsersService) {}

    async isValid(phoneNumber: string, password: string) {
        const user = await this.userService.findByPhone(phoneNumber);
        if (!user || !user?.password || !password) {
            return false;
        }
        return await bcrypt.compare(password, user.password);
    };
}