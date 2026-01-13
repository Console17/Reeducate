import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true, lowercase: true })
  email: string;

  @Prop({ required: true })
  gender: string;

  @Prop({ required: true, index: true })
  age: number;
}

export const userModel = SchemaFactory.createForClass(User);
