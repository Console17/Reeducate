import mongoose from "mongoose";
const { Schema } = mongoose;

export interface Expense extends Document {
  title: string;
  description: string;
  price: number;
  img: string;
  category: string;
}

const expenseSchema = new Schema<Expense>(
  {
    title: {
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
    img: {
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
