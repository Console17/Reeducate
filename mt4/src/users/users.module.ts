import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserResolver } from './users.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { userSchema } from './schema/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'users',
        schema: userSchema,
      },
    ]),
  ],
  providers: [UsersService, UserResolver],
})
export class UsersModule {}
