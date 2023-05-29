import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema} from "mongoose";
import { Product } from "src/app/products/entities/product.entity";
import { UserComment, UserCommentSchema } from "./user-comment.entity";

@Schema({timestamps: true})
export class Comment {
    @Prop()
    title: string;

    @Prop()
    text: string;

    @Prop({ type: UserCommentSchema })
    user: UserComment;

    @Prop()
    verify: boolean;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Product'})
    product: MongooseSchema.Types.ObjectId | Product;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);

export type CommentDocument = Comment & Document;