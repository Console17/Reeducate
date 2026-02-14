import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, userModel } from './schema/users.schema';
import { AwsS3Module } from 'src/aws-s3/aws-s3.module';
import { EmailSenderModule } from 'src/email-sender/email-sender.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: userModel }]),
    AwsS3Module,
    EmailSenderModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService, MongooseModule],
})
export class UserModule {}
