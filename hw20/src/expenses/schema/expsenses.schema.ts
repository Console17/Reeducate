import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema()
export class Expsense {
  @Prop({ required: true, enum: ['food', 'gym', 'electronics', 'shopping'] })
  category: string;

  @Prop({ required: true })
  productName: string;

  @Prop({ required: true })
  quantity: number;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  totalPrice: number;

  @Prop({
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'User',
  })
  user: mongoose.Types.ObjectId;
}

export const expsenseModel = SchemaFactory.createForClass(Expsense);
