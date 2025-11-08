import mongoose from "mongoose";
import "dotenv/config";

export default async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("connected successfully");
  } catch (e) {
    console.log("couldn't connect to DB", e);
  }
};
