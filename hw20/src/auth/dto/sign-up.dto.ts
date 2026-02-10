import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class SignUpDto {
  @ApiProperty({ example: 'guga', type: String })
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty({ example: 'akofa', type: String })
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiProperty({ example: 22, type: Number })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(150)
  age: number;

  @ApiProperty({ example: 'agma@gmail.copm', type: String })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({ example: 525525252, type: Number })
  @IsNotEmpty()
  @IsNumber()
  phoneNumber: number;

  @ApiProperty({ example: 'male', type: String })
  @IsNotEmpty()
  @IsString()
  gender: string;

  @ApiProperty({ example: 'akofa', type: String })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({ example: 'user', type: String })
  @IsOptional()
  @IsString()
  role: 'user' | 'admin';
}
