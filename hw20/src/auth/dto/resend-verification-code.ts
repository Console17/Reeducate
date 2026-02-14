import { IsEmail, IsNotEmpty } from 'class-validator';

export class ResendVerificationCode {
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
