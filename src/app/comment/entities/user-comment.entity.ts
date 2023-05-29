import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Schema as MongooseSchema } from "mongoose";
import { User } from "src/app/users/entities/user.entity";
 
@Schema({ _id: false })
export class UserComment {
    @Prop()
    fullName: string;

    @Prop({type: MongooseSchema.Types.ObjectId, ref: 'User'})
    id: MongooseSchema.Types.ObjectId | User;

    @Prop()
    buyer: boolean;
}

export const UserCommentSchema = SchemaFactory.createForClass(UserComment);
