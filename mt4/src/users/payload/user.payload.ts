import { Field, ID, ObjectType } from '@nestjs/graphql';
import { PostPayload } from 'src/posts/payload/post.payload';
import { PostPayloadWithoutAuthor } from './post.payload';

@ObjectType()
export class UserPayload {
  @Field(() => ID)
  _id: string;

  @Field(() => String)
  fullName: string;

  @Field(() => String)
  email: string;

  @Field(() => [PostPayloadWithoutAuthor])
  posts: object[];
}
