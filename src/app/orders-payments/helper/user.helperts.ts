import { Injectable } from "@nestjs/common";
import { Schema } from "mongoose";
import { UsersService } from "src/app/users/users.service";

@Injectable()
export class UserHelper {
    constructor(private readonly userService: UsersService) {}

    async addressIstEmpty(id: Schema.Types.ObjectId) {
        const user = await this.userService.findOne(id);
        if (!user.address || Object.keys(user.address).length == 0 ) {
            return true;
        }
        return false;
    };
}