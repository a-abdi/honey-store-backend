import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Comment, CommentDocument } from './entities/comment.entity';
import { Model, Schema } from 'mongoose';
import { AuthUserInfo } from 'src/interface/auth-user-info';
import { UserComment } from './entities/user-comment.entity';

@Injectable()
export class CommentService {
  constructor(@InjectModel(Comment.name) private readonly commentModel: Model<CommentDocument>) {}
  
  async create(product: Schema.Types.ObjectId, createCommentDto: CreateCommentDto, userComment: UserComment) {
    return await this.commentModel.create({product, ...createCommentDto, user: userComment});
  }

  async findAll(product: Schema.Types.ObjectId) {
    return await this.commentModel.find({$and: [{ product }, { verify: true }] }).exec();
  }

  async userFindOne(productId: Schema.Types.ObjectId, user: AuthUserInfo) {
    return await this.commentModel.findOne(
      {
        $and: [
          { product: productId }, 
          { "user.id": user.userId },
          { verify: false }
        ] 
      }
    ).exec();
  }

  async userUpdate(user: AuthUserInfo, commentId: Schema.Types.ObjectId, updateCommentDto: UpdateCommentDto, opt = {}) {
    return await this.commentModel.findOneAndUpdate(
      {
        $and: [
          {_id: commentId},
          {"user.id": user.userId},
          {verify: false}
        ] 
      },
      updateCommentDto, 
      opt
    ).exec();
  }

  async remove(commentId: Schema.Types.ObjectId, user: AuthUserInfo) {
    return await this.commentModel.findOneAndRemove(
      {
        $and: [
          {_id: commentId},
          {"user.id": user.userId},
          {verify: false}
        ] 
      }
    ).exec();
  }

  async adminRemove(commentId: Schema.Types.ObjectId) {
    return await this.commentModel.deleteOne({ _id: commentId }).exec();
  }

  async adminVerify(commentId: Schema.Types.ObjectId, opt = {}) {
    return await this.commentModel.updateOne({ _id: commentId }, { verify: true }, opt).exec();
  }

  async adminGetNotVerify() {
    return await this.commentModel.find({ verify: false }).lean().populate('product', ['name', 'code']).exec();
  }

  async getProductsScor(productIdList: Schema.Types.ObjectId[]) {
    return await this.commentModel.aggregate([
      {
        $match: {
          verify: true,
          product: { $in: productIdList }
        }
      },
      {
        $group: {
          _id: "$product",
          productScore: {
            $avg: "$score"
          }
        }
      }
    ]);
  }
}
