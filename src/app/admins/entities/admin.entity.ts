import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema } from "mongoose";
import * as bcrypt from 'bcrypt';

@Schema()
export class Admin {
    _id: MongooseSchema.Types.ObjectId;

    @Prop()
    firstName: string;

    @Prop()
    lastName: string;

    @Prop({required: true, unique: true})
    phoneNumber: string;

    @Prop()
    email: string

    @Prop({select: false})
    password: string;
}

export type AdminDocument = Admin & Document;

export const AdminSchema = SchemaFactory.createForClass(Admin); 

export const AdminMiddleware = () => {
    AdminSchema.pre('save', async function(next) {
        if (this.isModified('password')) {
          this.password = await bcrypt.hash(this.password, 10); 
        }
        next()
    });
}