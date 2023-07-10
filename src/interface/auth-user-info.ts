import { Schema } from "mongoose";
import { Role } from "src/common/declare/enum";

export interface AuthUserInfo {
    userId: Schema.Types.ObjectId;
    phoneNumber: string;
    roles: Role[];
}

export interface ResponseMetaDate {
    previousPage?: Schema.Types.ObjectId;
    nextPage?: Schema.Types.ObjectId;
}