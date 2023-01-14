import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Admin {
    @Prop()
    username: string

    @Prop()
    password: string
}

export type AdminDocument = Admin & Document;

export const AdminSchema = SchemaFactory.createForClass(Admin); 
