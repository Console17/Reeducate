import { Field, ID, ObjectType } from '@nestjs/graphql';
import { UserPayloadWithoutPosts } from './user.payload';

@ObjectType()
export class PostPayload {
  @Field(() => ID)
  _id: string;

  @Field(() => String)
  title: string;

  @Field(() => String)
  description: string;

  @Field(() => UserPayloadWithoutPosts)
  author: object;
}
