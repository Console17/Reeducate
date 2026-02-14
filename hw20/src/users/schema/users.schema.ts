import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema()
export class User {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true, min: 0, max: 150 })
  age: number;

  @Prop({ required: true, unique: true, lowercase: true })
  email: string;

  @Prop({ type: String, required: true, select: false })
  password: string;

  @Prop({ required: true })
  phoneNumber: number;

  @Prop({ required: true })
  gender: string;

  @Prop({
    required: true,
    enum: ['user', 'admin'],
    default: 'user',
  })
  role: 'user' | 'admin';

  @Prop({ default: null })
  subscriptionStartDate: Date;

  @Prop({ default: null })
  subscriptionEndDate: Date;

  @Prop({ types: [mongoose.Types.ObjectId], ref: 'Expsense', default: [] })
  expenses: mongoose.Types.ObjectId[];

  @Prop({ type: Boolean })
  isActive: boolean;

  @Prop({ type: Boolean, default: false })
  isVerified: boolean;

  @Prop({ type: String })
  OTPCode: string;

  @Prop({ type: String })
  OTPCodeExpirationDate: string;
}

export const userModel = SchemaFactory.createForClass(User);
