import { IsMongoId, IsOptional } from "class-validator";
import { Message } from "../message";
import { Name } from "../message/name";
import { Schema } from "mongoose";

export class MongoIdParams {
    @IsOptional()
    @IsMongoId({message: Message.INCORRECT(Name.ID)})
    _id: Schema.Types.ObjectId;
  
    @IsOptional()
    @IsMongoId({message: Message.INCORRECT(Name.ID)})
    productId: Schema.Types.ObjectId;
  
    @IsOptional()
    @IsMongoId({message: Message.INCORRECT(Name.ID)})
    commentId: Schema.Types.ObjectId;
  }
  