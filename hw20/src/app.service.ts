import { Injectable } from '@nestjs/common';
import { SendEmailDto } from './email-sender/dto/send-email.dto';
import { EmailSenderService } from './email-sender/email-sender.service';

@Injectable()
export class AppService {
  constructor(private emailSenderService: EmailSenderService) {}
  getHello(): string {
    return 'Hello World!';
  }

  sendEmailtoSomeone(sendEmailDto: SendEmailDto) {
    return this.emailSenderService.sendWelcomeText(sendEmailDto);
  }
}
