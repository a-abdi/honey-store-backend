import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Admin, AdminDocument } from './entities/admin.entity';

@Injectable()
export class AdminsService {
  constructor(
    @InjectModel(Admin.name) private readonly adminModel: Model<AdminDocument>
  ){}

  async create(createAdminDto: CreateAdminDto): Promise<Admin> {
    return await this.adminModel.create(createAdminDto);
  }

  async findAll() {
    return await this.adminModel.find().exec();
  }

  async findByPhone(phoneNumber: string) {
    return await this.adminModel.findOne({phoneNumber}).exec();
  }

  async findByID(_id: string) {
    return await this.adminModel.findOne({_id}).exec();
  }

  update(id: number, updateAdminDto: UpdateAdminDto) {
    return `This action updates a #${id} admin`;
  }

  remove(id: number) {
    return `This action removes a #${id} admin`;
  }
}
