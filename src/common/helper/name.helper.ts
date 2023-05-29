import { Injectable } from "@nestjs/common";
import { Schema } from "mongoose";
import { UserDocument } from "src/app/users/entities/user.entity";

@Injectable()
export class NameHelper {
    userFullName(user: UserDocument & {_id: Schema.Types.ObjectId}) {
        if (user.firstName && user.lastName) {
            return `${user.firstName} ${user.lastName}`;
        }
        if (user.firstName) {
            return user.firstName;
        }
        if (user.lastName) {
            return user.lastName;
        }
        return 'کاربر';
    };
}