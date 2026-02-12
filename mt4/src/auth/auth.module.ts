import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { userSchema } from 'src/users/schema/user.schema';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      global: true,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_TOKEN'),
        signOptions: { expiresIn: '1h' },
      }),
    }),
    MongooseModule.forFeature([
      {
        name: 'users',
        schema: userSchema,
      },
    ]),
  ],
  providers: [AuthResolver, AuthService],
})
export class AuthModule {}
