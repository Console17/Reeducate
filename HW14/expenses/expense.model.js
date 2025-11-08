import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      require: true,
    },
    price: {
      type: Number,
      require: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("expense", expenseSchema);
