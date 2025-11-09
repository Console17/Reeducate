import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      lowercase: true,
    },
    password: {
      type: String,
      require: true,
      select: false,
    },
    birthDate: {
      type: Date,
      require: true,
    },
    blogs: {
      type: Schema.Types.ObjectId,
      ref: "blog",
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.model("user", userSchema);
