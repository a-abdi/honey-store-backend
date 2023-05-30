import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './entities/user.entity';
import { UpdatePasswordDto } from './dto/update-password';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>){}

  async create(createUserDto: CreateUserDto) {
    return await this.userModel.create(createUserDto);
  }

  async findAll() {
    return await this.userModel.find().exec();
  }

  async findOne(_id: Schema.Types.ObjectId) {
    return await this.userModel.findOne({_id}).exec();
  }

  async findByPhone(phoneNumber: string) {
    return await this.userModel.findOne({phoneNumber}).select(['phoneNumber','password']).exec();
  }

  async update(_id: Schema.Types.ObjectId, updateUserDto: UpdateUserDto) {
    return await this.userModel.findOneAndUpdate({_id}, updateUserDto, {new: true}).exec();
  }

  async updateOne(_id: Schema.Types.ObjectId, updatePasswordDto: UpdatePasswordDto) {
    return await this.userModel.updateOne({_id}, updatePasswordDto).exec();
  }

  async remove(_id: Schema.Types.ObjectId) {
    return await this.userModel.findOneAndRemove({ _id }).exec();
  }
}
