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
import { User } from './interface/users.interface';

@Injectable()
export class UsersService {
  private users: User[] = [
    {
      id: 1,
      firstName: 'firstName',
      lastName: 'lastName',
      email: 'email',
      phoneNumber: 123,
      gender: 'male',
      subscriptionStartDate: null,
      subscriptionEndDate: null,
    },
    {
      id: 2,
      firstName: 'firstName',
      lastName: 'lastName',
      email: 'email',
      phoneNumber: 123,
      gender: 'male',
      subscriptionStartDate: null,
      subscriptionEndDate: null,
    },
    {
      id: 3,
      firstName: 'firstName',
      lastName: 'lastName',
      email: 'test@gj',
      phoneNumber: 123,
      gender: 'male',
      subscriptionStartDate: null,
      subscriptionEndDate: null,
    },
    {
      id: 4,
      firstName: 'firstName',
      lastName: 'lastName',
      email: 'email',
      phoneNumber: 123,
      gender: 'female',
      subscriptionStartDate: null,
      subscriptionEndDate: null,
    },
    {
      id: 5,
      firstName: 'firstName',
      lastName: 'lastName',
      email: 'email',
      phoneNumber: 123,
      gender: 'female',
      subscriptionStartDate: null,
      subscriptionEndDate: null,
    },
  ];
  getAllUsers({ page, take, gender, email }: QueryParamsDto) {
    let filteredUsers = this.users;

    if (gender) {
      filteredUsers = filteredUsers.filter((user) =>
        user.gender.toLowerCase().startsWith(gender.toLowerCase()),
      );
    }

    if (email) {
      filteredUsers = filteredUsers.filter((user) =>
        user.email.toLowerCase().startsWith(email.toLowerCase()),
      );
    }
    const start = (page - 1) * take;
    const end = page * take;
    const data = filteredUsers.slice(start, end);
    return {
      page,
      take,
      total: filteredUsers.length,
      users: data,
    };
  }

  createUser({
    firstName,
    lastName,
    email,
    phoneNumber,
    gender,
  }: CreateUserDto) {
    if (!firstName || !lastName || !email || !phoneNumber || !gender) {
      throw new HttpException(
        'provide all data for user ',
        HttpStatus.BAD_REQUEST,
      );
    }
    const lastId = this.users[this.users.length - 1]?.id || 0;
    const startDate = new Date();
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + 1);

    const newUser = {
      id: lastId + 1,
      firstName,
      lastName,
      email,
      phoneNumber,
      gender,
      subscriptionStartDate: startDate,
      subscriptionEndDate: endDate,
    };
    this.users.push(newUser);
    return newUser;
  }

  getUserById(userId: number) {
    const user = this.users.find((el) => el.id === userId);
    if (!user) {
      throw new NotFoundException('User nor found!!!!!!!!!!!!!!');
    }
    return user;
  }

  deleteUserById(userId: number) {
    const userIndex = this.users.findIndex((el) => el.id === userId);
    if (userIndex === -1) {
      throw new NotFoundException('User nor found!!!!!!!!!!!!!!');
    }
    const deletedUser = this.users.splice(userIndex, 1);
    return deletedUser;
  }

  updateUserById(userId: number, updateUserDto: UpdateUserDto) {
    const userIndex = this.users.findIndex((el) => el.id === userId);
    if (userIndex === -1) {
      throw new NotFoundException('User nor found!!!!!!!!!!!!!!');
    }

    const updateReq = {};
    if (updateUserDto.firstName)
      updateReq['firstName'] = updateUserDto.firstName;
    if (updateUserDto.lastName) updateReq['lastName'] = updateUserDto.lastName;
    if (updateUserDto.gender) updateReq['gender'] = updateUserDto.gender;
    if (updateUserDto.email) updateReq['email'] = updateUserDto.email;
    if (updateUserDto.phoneNumber)
      updateReq['phoneNumber'] = updateUserDto.phoneNumber;

    this.users[userIndex] = {
      ...this.users[userIndex],
      ...updateReq,
    };

    return this.users[userIndex];
  }

  getUserByEmail(email: string) {
    return this.users.find((e) => e.email === email);
  }

  upgradeSubscription(email: string) {
    const user = this.users.find((e) => e.email === email);

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

    return user;
  }
}
