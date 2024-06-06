import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RegisterDTO } from 'src/auth/auth.dto';
import { IUser } from 'src/models/user.schema';

@Injectable()
export class UserHelper {
  constructor(@InjectModel('User') private userModel: Model<IUser>) {}

  async createUser(userDto: RegisterDTO) {
    const { email } = userDto;
    const userExist = await this.userModel.findOne({ email });
    if (userExist) {
      throw new HttpException('User already exist !', HttpStatus.BAD_REQUEST);
    }
    const createdUser = new this.userModel(userDto);
    const saveduser = await createdUser.save();
    return saveduser;
  }
  async findByPayload(payload: any) {
    const { email } = payload;
    return await this.userModel.findOne({ email });
  }
}
