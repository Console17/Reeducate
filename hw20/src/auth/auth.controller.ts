import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { IsAuthGuard } from 'src/guards/is-auth.guard';
import { UserId } from 'src/decorators/user-id.decorator';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  @ApiBadRequestResponse({ example: 'user exists' })
  @ApiCreatedResponse({ example: 'user created' })
  signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }

  @Post('sign-in')
  @ApiBadRequestResponse({ example: 'Invalid' })
  @ApiCreatedResponse({
    example: {
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OTg5ZTNjODk3OGYxOGIzM2JjMGZhOTgiLCJyb2xlIjoidXNlciIsImlhdCI6MTc3MDY0NDQzNSwiZXhwIjoxNzcwNjQ4MDM1fQ.6UlqOPs5m8hrpUdFRSTBOuXeDuvnP6J57UbZ9LSlIlQ',
    },
  })
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }

  @Get('current-user')
  @UseGuards(IsAuthGuard)
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({ example: 'permition denied' })
  @ApiOkResponse({
    example: {
      _id: '698b1a8ab277c658e6d7adfc',
      firstName: 'araguga',
      lastName: 'last',
      age: 30,
      email: 'email3@gmail.com',
      phoneNumber: 124545,
      gender: 'female',
      role: 'user',
      subscriptionStartDate: '2026-02-10T11:46:18.206Z',
      subscriptionEndDate: '2026-03-10T11:46:18.206Z',
      expenses: [],
      __v: 0,
      isActive: false,
    },
  })
  currenct(@UserId() userId) {
    return this.authService.currenUser(userId);
  }
}
