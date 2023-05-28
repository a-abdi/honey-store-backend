import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema} from "mongoose";
import * as bcrypt from 'bcrypt';
import { AddressUserEntity, AddressUserEntitySchema } from "./address.entity";

@Schema({ timestamps: true })
export class User {
    _id: MongooseSchema.Types.ObjectId;

    @Prop()
    firstName: string;

    @Prop()
    lastName: string;

    @Prop({ required: true, unique: true })
    phoneNumber: string;

    @Prop({ type: AddressUserEntitySchema })
    address: AddressUserEntity;

    @Prop({select: false})
    password: string;
}

export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User);

export const UserMiddleware = () => {
    UserSchema.pre('save', async function(next) {
        if (this.isModified('password')) {
          this.password = await bcrypt.hash(this.password, 10); 
        }
        next()
    });
}
