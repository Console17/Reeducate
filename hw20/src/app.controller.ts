import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { SendEmailDto } from './email-sender/dto/send-email.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/send-email')
  sendEmailtoSomeone(@Body() sendEmailDto: SendEmailDto) {
    return this.appService.sendEmailtoSomeone(sendEmailDto);
  }
}
