import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { User, userModel } from 'src/users/schema/users.schema';

@Module({
  imports: [
    ConfigModule.forRoot(),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_TOKEN,
    }),
    MongooseModule.forFeature([{ name: User.name, schema: userModel }]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
