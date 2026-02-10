import {
  IsEmail,
  isEmail,
  IsNotEmpty,
  IsNumber,
  Max,
  Min,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'guga', type: String })
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty({ example: 'doe', type: String })
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiProperty({ example: 24, type: Number })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(150)
  age: number;

  @ApiProperty({ example: 'email@gmail.com', type: String })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({ example: 999999, type: Number })
  @IsNotEmpty()
  @IsNumber()
  phoneNumber: number;

  @ApiProperty({ example: 'male', type: String })
  @IsNotEmpty()
  @IsString()
  gender: string;
}
