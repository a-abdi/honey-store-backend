import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Comment, CommentDocument } from './entities/comment.entity';
import { Model, Schema } from 'mongoose';

@Injectable()
export class CommentService {
  constructor(@InjectModel(Comment.name) private readonly commentModel: Model<CommentDocument>) {}
  
  async create(product: Schema.Types.ObjectId, createCommentDto: CreateCommentDto) {
    return await this.commentModel.create({product, ...createCommentDto});
  }

  async findAll(product: Schema.Types.ObjectId) {
    return await this.commentModel.find({product}).exec();
  }

  async findOne(commentId: Schema.Types.ObjectId) {
    return await this.commentModel.findOne({_id: commentId}).exec();
  }

  async update(commentId: Schema.Types.ObjectId, updateCommentDto: UpdateCommentDto, opt = {}) {
    return await this.commentModel.findOneAndUpdate({_id: commentId}, updateCommentDto, opt).exec();
  }

  async remove(commentId: Schema.Types.ObjectId) {
    return await this.commentModel.findOneAndRemove({_id: commentId}).exec();
  }
}
