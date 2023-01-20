import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema } from "mongoose";

@Schema()
export class Admin {
    @Prop()
    _id: MongooseSchema.Types.ObjectId;

    @Prop()
    firstName: string;

    @Prop()
    lastName: string;

    @Prop()
    phoneNumber: string;

    @Prop()
    email: string

    @Prop()
    password: string;
}

export type AdminDocument = Admin & Document;

export const AdminSchema = SchemaFactory.createForClass(Admin); 
