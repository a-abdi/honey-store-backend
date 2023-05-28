import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema} from "mongoose";
import { Product } from "src/app/products/entities/product.entity";
import { UserViewpoint, UserViewpointSchema } from "./user-viewpoint.entity";

@Schema({timestamps: true})
export class Viewpoint {
    @Prop()
    title: string;

    @Prop()
    text: string;

    @Prop({ type: UserViewpointSchema })
    user: UserViewpoint;

    @Prop()
    verify: boolean;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Product'})
    product: MongooseSchema.Types.ObjectId | Product;
}

export const ViewpointSchema = SchemaFactory.createForClass(Viewpoint);

export type ViewpointDocument = Viewpoint & Document;