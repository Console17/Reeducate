import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, userModel } from './schema/users.sceham';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: userModel }]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
