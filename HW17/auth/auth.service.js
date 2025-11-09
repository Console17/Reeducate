import userModel from "../users/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";

async function signUp(req, res) {
  const { fullName, email, password, birthDate } = req.body;

  const existUser = await userModel.findOne({ email });
  if (existUser) {
    return res.status(400).json({ message: "user already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  await userModel.create({
    fullName,
    email,
    password: hashedPassword,
    birthDate,
  });
  res.json({ message: "user created successfully" });
}

async function signIn(req, res) {
  const { email, password } = req.body;

  const existUser = await userModel.findOne({ email }).select("password");
  if (!existUser) {
    return res.status(400).json({ message: "email or password is incorrect" });
  }

  const isPassEqual = await bcrypt.compare(password, existUser.password);
  if (!isPassEqual) {
    return res.status(400).json({ message: "email or password is incorrect" });
  }

  const payload = {
    userId: existUser._id,
  };
  const token = await jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  res.json({ token });
}

async function currentUser(req, res) {
  const user = await userModel.findById(req.userId);
  res.json(user);
}

export const AuthService = {
  signUp,
  signIn,
  currentUser,
};
