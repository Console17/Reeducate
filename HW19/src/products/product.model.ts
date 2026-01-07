import mongoose from "mongoose";
const { Schema } = mongoose;

export interface Product extends Document {
  name: string;
  description: string;
  price: number;
  photo: string;
  category: string;
}

const productSchema = new Schema<Product>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    photo: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<Product>("Product", productSchema);
