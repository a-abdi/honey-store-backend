import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema } from 'mongoose';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Admin, AdminDocument } from './entities/admin.entity';

@Injectable()
export class AdminsService {
  constructor(
    @InjectModel(Admin.name) private readonly adminModel: Model<AdminDocument>
  ){}

  async create(createAdminDto: CreateAdminDto): Promise<AdminDocument> {
    return await this.adminModel.create(createAdminDto);
  }

  async createSeed(adminData: {phoneNumber: string, password: string}): Promise<AdminDocument> {
    return await this.adminModel.create(adminData);
  }

  async findAll() {
    return await this.adminModel.find().exec();
  }

  async findByPhone(phoneNumber: string) {
    return await this.adminModel.findOne({phoneNumber}).select(['phoneNumber','password']).exec();
  }

  async findByID(_id: Schema.Types.ObjectId) {
    return await this.adminModel.findOne({_id}).exec();
  }

  async update(_id: Schema.Types.ObjectId, updateAdminDto: UpdateAdminDto) {
    return await this.adminModel.findOneAndUpdate({_id}, updateAdminDto, {new: true});
  }

  async remove(_id: Schema.Types.ObjectId) {
    return await this.adminModel.findOneAndRemove({_id});
  }
}
