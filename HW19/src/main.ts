import express from "express";
import logMiddleware from "./middlewares/log.middleware.js";
import dbCondig from "./config/db.condig.js";

const app = express();

app.get("/", (req, res) => {
  res.send("hello from 123");
});

dbCondig().then(() => {
  app.listen(3000, () => {
    console.log("server running on http://localhost:3000");
  });
});
