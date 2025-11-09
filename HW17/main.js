import express from "express";
import dbConfig from "./config/db.config.js";
import authRouter from "./auth/auth.controller.js";
import blogRouter from "./blogs/blog.controller.js";
import userRouter from "./users/user.controller.js";

const app = express();
app.use(express.json());

app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/blogs", blogRouter);

dbConfig().then(() => {
  app.listen(3000, () => {
    console.log("server running on http://localhost:3000");
  });
});
