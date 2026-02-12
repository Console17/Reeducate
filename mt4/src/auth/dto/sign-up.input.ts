import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class SignUpInput {
  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  fullName: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  password: string;
}
