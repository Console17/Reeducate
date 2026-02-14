import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { SendEmailDto } from './dto/send-email.dto';
import { WelcomeTextDto } from './dto/welcome-text.dto';

@Injectable()
export class EmailSenderService {
  constructor(private emailService: MailerService) {}

  async sendEmailToSomeone({ to, subject, text }: SendEmailDto) {
    const options = {
      to,
      from: 'gita back <guga.akopashvili123@gmail.com>',
      subject,
      text,
    };

    await this.emailService.sendMail(options);
    console.log('email sent');
  }

  async sendWelcomeText({ to }: WelcomeTextDto) {
    const options = {
      to,
      from: 'gita back <guga.akopashvili123@gmail.com>',
      subject: 'welcome',
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.5;">
          <h2>Welcome!</h2>
          <p>Thanks for joining us. We are glad you are here.</p>
        </div>
      `.trim(),
    };

    await this.emailService.sendMail(options);
  }

  async sendOtpCode(to, otpCode) {
    const options = {
      to,
      from: 'gita back <guga.akopashvili123@gmail.com>',
      subject: 'Verify Your Email - OTP Code',
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.5; max-width: 600px; margin: 0 auto;">
          <h2>Email Verification</h2>
          <p>Your OTP code is:</p>
          <div style="background-color: #f0f0f0; padding: 20px; text-align: center; border-radius: 8px; margin: 20px 0;">
            <h1 style="color: #333; margin: 0; letter-spacing: 5px; font-size: 32px;">${otpCode}</h1>
          </div>
          <p>This code will expire in 3 minutes.</p>
          <p>If you didn't request this code, please ignore this email.</p>
        </div>
      `.trim(),
    };

    await this.emailService.sendMail(options);
  }
}
