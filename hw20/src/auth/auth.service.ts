import { BadRequestException, Injectable } from '@nestjs/common';
import { SignUpDto } from './dto/sign-up.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/users/schema/users.schema';
import { Model } from 'mongoose';
import bcrypt from 'bcrypt';
import { SignInDto } from './dto/sign-in.dto';
import { JwtService } from '@nestjs/jwt';
import { VerifyUserDto } from './dto/verify-user.dto';
import { EmailSenderService } from 'src/email-sender/email-sender.service';
import { ResendVerificationCode } from './dto/resend-verification-code';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService,
    private emailSenderService: EmailSenderService,
  ) {}
  async signUp({
    firstName,
    lastName,
    age,
    email,
    phoneNumber,
    gender,
    password,
    role,
  }: SignUpDto) {
    const existUser = await this.userModel.findOne({ email });
    if (existUser) throw new BadRequestException('user exists');

    const otpCode = Math.random().toString().slice(2, 8);
    const otpCodeExpDate = String(new Date().getTime() + 3 * 60 * 1000);

    const startDate = new Date();
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + 1);

    const hashedPassword = await bcrypt.hash(password, 10);
    await this.userModel.create({
      firstName,
      lastName,
      age,
      email,
      phoneNumber,
      gender,
      password: hashedPassword,
      role,
      subscriptionStartDate: startDate,
      subscriptionEndDate: endDate,
      OTPCode: otpCode,
      OTPCodeExpirationDate: otpCodeExpDate,
    });
    await this.emailSenderService.sendOtpCode(email, otpCode);
    return 'check email to verify';
  }

  async verifyUser({ email, otpCode }: VerifyUserDto) {
    const existUser = await this.userModel.findOne({ email });
    if (!existUser) throw new BadRequestException('user not found');

    if (otpCode !== existUser.OTPCode)
      throw new BadRequestException('wrong otp code');

    if (new Date().getTime() > parseInt(existUser.OTPCodeExpirationDate))
      throw new BadRequestException('otp code expired');

    await this.userModel.findByIdAndUpdate(existUser._id, {
      OTPCode: null,
      OTPCodeExpirationDate: null,
      isVerified: true,
    });

    await this.emailSenderService.sendWelcomeText({ to: email });

    const payload = {
      userId: existUser._id,
      role: existUser.role,
    };

    const token = await this.jwtService.sign(payload, { expiresIn: '1h' });

    return { token };
  }

  async resendVerificationCode({ email }: ResendVerificationCode) {
    const existUser = await this.userModel.findOne({ email });
    if (!existUser) throw new BadRequestException('user not found');

    if (existUser.isVerified) throw new BadRequestException('already verified');

    if (new Date().getTime() < parseInt(existUser.OTPCodeExpirationDate))
      throw new BadRequestException('otp code not expired');

    const otpCode = Math.random().toString().slice(2, 8);
    const otpCodeExpDate = String(new Date().getTime() + 3 * 60 * 1000);

    await this.userModel.findByIdAndUpdate(existUser._id, {
      OTPCode: otpCode,
      OTPCodeExpirationDate: otpCodeExpDate,
    });

    await this.emailSenderService.sendOtpCode(email, otpCode);
    return 'check email to verify';
  }

  async signIn({ email, password }: SignInDto) {
    const existUser = await this.userModel
      .findOne({ email })
      .select('+password');
    if (!existUser) throw new BadRequestException('Invalid');

    if (!existUser.isVerified) throw new BadRequestException('verify email');

    const isPassEqual = await bcrypt.compare(password, existUser.password);
    if (!isPassEqual) throw new BadRequestException('Invalid');

    const payload = {
      userId: existUser._id,
      role: existUser.role,
    };

    const token = await this.jwtService.sign(payload, { expiresIn: '1h' });

    return { token };
  }

  async currenUser(userId) {
    const user = await this.userModel.findById(userId);
    return user;
  }
}
