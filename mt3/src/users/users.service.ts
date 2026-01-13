import {
  BadRequestException,
  Injectable,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schema/users.sceham';
import { QueryParamsDto } from './dto/query-params.dto';
import { faker } from '@faker-js/faker';

@Injectable()
export class UsersService implements OnModuleInit {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) {}

  async onModuleInit() {
    const usersCount = await this.userModel.countDocuments();

    if (usersCount === 0) {
      const dataToInsert: any = [];
      for (let i = 0; i < 30000; i++) {
        dataToInsert.push({
          firstName: faker.person.firstName(),
          lastName: faker.person.lastName(),
          email: faker.internet.email(),
          gender: faker.person.gender(),
          age: faker.number.int({ min: 12, max: 99 }),
        });
      }

      const BATCH_SIZE = 10_000;

      for (let i = 0; i < dataToInsert.length; i += BATCH_SIZE) {
        const data = dataToInsert.slice(i, BATCH_SIZE + i);
        await this.userModel.insertMany(data);
      }

      const finalCount = await this.userModel.countDocuments();
      console.log(`Successfully inserted ${finalCount} users`);
    }
  }

  async getAllUsers({
    page,
    take,
    gender,
    age,
    ageFrom,
    ageTo,
    name,
  }: QueryParamsDto) {
    let filter: any = {};

    if (gender) {
      filter.gender = { $regex: `^${gender}`, $options: 'i' };
    }

    if (age) {
      filter.age = age;
    } else if (ageFrom || ageTo) {
      filter.age = {};
      if (ageFrom) {
        filter.age.$gte = ageFrom;
      }
      if (ageTo) {
        filter.age.$lte = ageTo;
      }
    }

    if (name) {
      filter.$or = [
        { firstName: { $regex: name, $options: 'i' } },
        { lastName: { $regex: name, $options: 'i' } },
      ];
    }

    const skip = (page - 1) * take;

    const [users, total] = await Promise.all([
      this.userModel.find(filter).skip(skip).limit(take),
      this.userModel.countDocuments(filter),
    ]);

    return {
      page,
      take,
      total,
      users,
    };
  }

  async createUser(dto: CreateUserDto) {
    const existUser = await this.userModel.findOne({ email: dto.email });
    if (existUser) throw new BadRequestException('user already exists');

    const newUser = await this.userModel.create({
      ...dto,
    });
    return newUser;
  }

  async getTotalUsers() {
    const total = await this.userModel.countDocuments();
    return { total };
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
}
