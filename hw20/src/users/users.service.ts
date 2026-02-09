import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { QueryParamsDto } from './dto/query-params.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/users.schema';
import { Model, ObjectId } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) {}

  async getAllUsers({ page, take, gender, email }: QueryParamsDto) {
    let filter: any = {};

    if (gender) {
      filter.gender = { $regex: `^${gender}` };
    }

    if (email) {
      filter.email = { $regex: `^${email}` };
    }
    const skip = (page - 1) * take;

    const [users, total] = await Promise.all([
      this.userModel
        .find(filter)
        .skip(skip)
        .limit(take)
        .populate({ path: 'expenses', select: '-user' }),
      ,
      this.userModel.countDocuments(filter),
    ]);

    return {
      page,
      take,
      total,
      users,
    };
  }

  async getUserById(userId: string) {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException('User nor found!!!!!!!!!!!!!!');
    }
    return user;
  }

  async deleteUserById(userId: string) {
    const user = await this.userModel.findByIdAndDelete(userId);
    if (!user) {
      throw new NotFoundException('User nor found!!!!!!!!!!!!!!');
    }
    return user;
  }

  async updateUserById(userId: string, updateUserDto: UpdateUserDto) {
    const user = await this.userModel.findByIdAndUpdate(userId, updateUserDto, {
      new: true,
    });

    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  getUserByEmail(email: string) {
    return this.userModel.findOne({ email });
  }

  async upgradeSubscription(email: string) {
    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new NotFoundException('User nor found!!!!!!!!!!!!!!');
    }

    const now = new Date();

    if (!user.subscriptionEndDate || new Date(user.subscriptionEndDate) < now) {
      user.subscriptionStartDate = now;
      const newEnd = new Date();
      newEnd.setMonth(newEnd.getMonth() + 1);
      user.subscriptionEndDate = newEnd;
    } else {
      const currentEnd = new Date(user.subscriptionEndDate);
      currentEnd.setMonth(currentEnd.getMonth() + 1);
      user.subscriptionEndDate = currentEnd;
    }

    return user.save();
  }

  async addExpenseToUser(expenseId, userId) {
    const user = await this.userModel.findByIdAndUpdate(
      userId,
      { $push: { expenses: expenseId } },
      { new: true },
    );

    return user;
  }
}
