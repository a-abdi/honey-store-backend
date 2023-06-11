import { Injectable } from "@nestjs/common";
import { User } from "src/app/users/entities/user.entity";

@Injectable()
export class NameHelper {
    userFullName(user: User) {
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