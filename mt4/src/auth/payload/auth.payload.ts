import { Field, ObjectType } from '@nestjs/graphql';
import { UserPayload } from 'src/users/payload/user.payload';

@ObjectType()
export class AuthPayload {
  @Field(() => String)
  token: string;

  @Field(() => UserPayload)
  user: UserPayload;
}
