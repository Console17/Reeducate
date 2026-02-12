import { extend, Field, ID, ObjectType, OmitType } from '@nestjs/graphql';
import { PostPayload } from 'src/posts/payload/post.payload';

@ObjectType()
export class PostPayloadWithoutAuthor extends OmitType(PostPayload, [
  'author',
]) {}
