import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserPayloadWithoutPosts {
  @Field(() => ID)
  _id: string;

  @Field(() => String)
  fullName: string;

  @Field(() => String)
  email: string;
}
