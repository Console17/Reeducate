import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema()
export class Post {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true, unique: true, lowercase: true })
  description: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true })
  author: mongoose.Schema.Types.ObjectId;
}

export const postSchema = SchemaFactory.createForClass(Post);
