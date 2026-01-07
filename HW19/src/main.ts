import express from "express";
import logMiddleware from "./middlewares/admin.middleware.js";
import dbCondig from "./config/db.config.js";
import productRouter from "./products/product.controller.js";

const app = express();
app.use(express.json());

app.use("/products", productRouter);

dbCondig().then(() => {
  app.listen(3000, () => {
    console.log("server running on http://localhost:3000");
  });
});
