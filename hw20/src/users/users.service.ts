import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private users = [
    {
      id: 0,
      firstName: 'firstName',
      lastName: 'lastName',
      email: 'email',
      phoneNumber: 123,
      gender: 'who knows',
    },
  ];
  getAllUsers() {
    return this.users;
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
    const newUser = {
      id: lastId + 1,
      firstName,
      lastName,
      email,
      phoneNumber,
      gender,
    };
    this.users.push(newUser);
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
}
