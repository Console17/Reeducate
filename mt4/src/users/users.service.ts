import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schema/user.schema';
import { UpdateUserInput } from './dto/update-user.input';
import bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel('users') private usersModel: Model<User>) {}

  getAll() {
    return this.usersModel.find();
  }

  async updateUser(id: string, { email, fullName, password }: UpdateUserInput) {
    const updateData: Partial<User> = { email, fullName };
    if (password) updateData.password = await bcrypt.hash(password, 10);

    return this.usersModel.findByIdAndUpdate(id, updateData, {
      new: true,
    });
  }

  deleteUser(id: string) {
    return this.usersModel.findByIdAndDelete(id);
  }
}
