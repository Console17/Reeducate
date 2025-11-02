import express from "express";
import { v4 as uuidv4 } from "uuid";
import readFile from "./utils/readFile.js";
import writeFile from "./utils/writeFile.js";
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello");
});

app.get("/expenses", async (req, res) => {
  const expenses = await readFile("expenses.json", true);
  console.log(req.query, "query");
  const page = Number(req.query.page);
  const take = Math.min(Number(req.query.take), 5);
  res.json(expenses.slice((page - 1) * take, take * page));
});

app.post("/expenses", async (req, res) => {
  console.log(req.body);
  if (!req.body) {
    res.status(400).send("body is required");
    return;
  }

  const { category, price } = req.body;
  if (!category || !price) {
    res.status(400).send("category and price are required");
    return;
  }

  const expenses = await readFile("expenses.json", true);
  const newExpense = {
    id: uuidv4(),
    category,
    price,
  };
  expenses.push(newExpense);
  await writeFile("expenses.json", expenses);
  res.status(201).send("created new expense");
});

app.delete("/expenses/:id", async (req, res) => {
  const role = req.headers["role"];
  if (role !== "ADMIN") {
    return res.status(403).send("dont have access to delete");
  }
  const id = req.params.id;

  const expenses = await readFile("expenses.json", true);
  const index = expenses.findIndex((el) => el.id === id);
  if (index === -1) {
    res.status(404).send("user not found");
    return;
  }
  const deletedExpense = expenses.splice(index, 1);
  await writeFile("expenses.json", expenses);
  res.send(deletedExpense);
});

app.patch("/expenses/:id", async (req, res) => {
  const id = req.params.id;

  const expenses = await readFile("expenses.json", true);
  const expenseToUpdate = expenses.find((el) => el.id === id);
  if (!expenseToUpdate) {
    res.status(404).send("user not found");
    return;
  }

  if (req.body.category) {
    expenseToUpdate.category = req.body.category;
  }

  if (req.body.price) {
    expenseToUpdate.price = req.body.price;
  }
  await writeFile("expenses.json", expenses);
  res.send("updated");
});

app.listen(3000, () => {
  console.log("server running on http://localhost:3000");
});
