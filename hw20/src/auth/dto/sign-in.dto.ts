import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class SignInDto {
  @ApiProperty({ example: 'agma@gmail.copm', type: String })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'akofa', type: String })
  @IsNotEmpty()
  @IsString()
  password: string;
}
