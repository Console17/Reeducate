import {
  IsEmail,
  isEmail,
  IsNotEmpty,
  IsNumber,
  Max,
  Min,
  IsString,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(150)
  age: number;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsNumber()
  phoneNumber: number;

  @IsNotEmpty()
  @IsString()
  gender: string;
}
