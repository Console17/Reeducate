import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import bcrypt from 'bcrypt';
import { User } from 'src/users/schema/user.schema';
import { SignUpInput } from './dto/sign-up.input';
import { SignInInput } from './dto/sign-in.input';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('users') private usersModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async signUp({ email, fullName, password }: SignUpInput) {
    const existUser = await this.usersModel.findOne({ email });
    if (existUser) throw new BadRequestException('user exists');

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await this.usersModel.create({
      email,
      fullName,
      password: hashedPassword,
      posts: [],
    });

    const token = this.jwtService.sign({ userId: newUser._id });
    const user = await this.usersModel.findById(newUser._id);

    return { token, user };
  }

  async signIn({ email, password }: SignInInput) {
    const existUser = await this.usersModel
      .findOne({ email })
      .select('+password');
    if (!existUser) throw new BadRequestException('Invalid');

    const isPassEqual = await bcrypt.compare(password, existUser.password);
    if (!isPassEqual) throw new BadRequestException('Invalid');

    const token = this.jwtService.sign({ userId: existUser._id });
    const user = await this.usersModel.findById(existUser._id);

    return { token, user };
  }

  async currentUser(userId: string) {
    return this.usersModel.findById(userId);
  }
}
