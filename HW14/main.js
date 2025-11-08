import express from "express";
import expenseRouter from "./expenses/expense.controller.js";
import randomFactRouter from "./randomFacts/randomFact.controller.js";
import dbConfig from "./config/db.config.js";
const app = express();
app.use(express.json());

app.use("/expenses", expenseRouter);
app.use("/random-fact", randomFactRouter);

dbConfig().then(() => {
  app.listen(3000, () => {
    console.log("server running on http://localhost:3000");
  });
});
