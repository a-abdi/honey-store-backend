import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Schema as MongooseSchema } from "mongoose";
import { User } from "src/app/users/entities/user.entity";
 
@Schema({ _id: false })
export class UserViewpoint {
    @Prop()
    fullname: string;

    @Prop({type: MongooseSchema.Types.ObjectId, ref: 'User'})
    id: MongooseSchema.Types.ObjectId | User;

    @Prop()
    buyer: boolean;
}

export const UserViewpointSchema = SchemaFactory.createForClass(UserViewpoint);
