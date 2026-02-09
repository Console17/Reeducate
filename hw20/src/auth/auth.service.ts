import { BadRequestException, Injectable } from '@nestjs/common';
import { SignUpDto } from './dto/sign-up.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/users/schema/users.schema';
import { Model } from 'mongoose';
import bcrypt from 'bcrypt';
import { SignInDto } from './dto/sign-in.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}
  async signUp({
    firstName,
    lastName,
    email,
    phoneNumber,
    gender,
    password,
  }: SignUpDto) {
    const existUser = await this.userModel.findOne({ email });
    if (existUser) throw new BadRequestException('user exists');

    const startDate = new Date();
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + 1);

    const hashedPassword = await bcrypt.hash(password, 10);
    await this.userModel.create({
      firstName,
      lastName,
      email,
      phoneNumber,
      gender,
      password: hashedPassword,
      subscriptionStartDate: startDate,
      subscriptionEndDate: endDate,
    });
    return 'user created';
  }

  async signIn({ email, password }: SignInDto) {
    const existUser = await this.userModel
      .findOne({ email })
      .select('+password');
    if (!existUser) throw new BadRequestException('Invalid');

    const isPassEqual = await bcrypt.compare(password, existUser.password);
    if (!isPassEqual) throw new BadRequestException('Invalid');

    const payload = {
      userId: existUser._id,
    };

    const token = await this.jwtService.sign(payload, { expiresIn: '1h' });

    return { token };
  }

  async currenUser(userId) {
    const user = await this.userModel.findById(userId);
    return user;
  }
}
