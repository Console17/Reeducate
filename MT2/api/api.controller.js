import { Router } from "express";
import { v4 as uuidv4 } from "uuid";
import readFile from "../utils/readFile.js";
import writeFile from "../utils/writeFile.js";

const router = Router();

router.get("/expenses", async (req, res) => {
  const expenses = await readFile("expenses.json", true);

  const page = Number(req.query.page) || 1;
  const take = Math.min(Number(req.query.take) || 5, 5);

  res.json(expenses.slice((page - 1) * take, page * take));
});

router.get("/expenses/:id", async (req, res) => {
  const id = req.params.id;

  const expenses = await readFile("expenses.json", true);
  const expense = expenses.find((e) => e.id === id);

  if (!expense) return res.status(404).send("expense not found");

  res.json(expense);
});

router.post("/expenses", async (req, res) => {
  const { category, price } = req.body;
  if (!category || !price) {
    return res.status(400).send("category and price are required");
  }

  const expenses = await readFile("expenses.json", true);

  const newExpense = {
    id: uuidv4(),
    category,
    price,
  };

  expenses.push(newExpense);
  await writeFile("expenses.json", expenses);

  res.redirect("/");
});

router.get("/expenses/:id/delete", async (req, res) => {
  const id = req.params.id;

  const expenses = await readFile("expenses.json", true);
  const index = expenses.findIndex((e) => e.id === id);

  if (index === -1) return res.status(404).send("expense not found");

  expenses.splice(index, 1);
  await writeFile("expenses.json", expenses);

  res.redirect("/");
});

router.post("/expenses/:id/update", async (req, res) => {
  const id = req.params.id;

  const expenses = await readFile("expenses.json", true);
  const expense = expenses.find((e) => e.id === id);

  if (!expense) return res.status(404).send("expense not found");

  if (req.body.category) expense.category = req.body.category;
  if (req.body.price) expense.price = req.body.price;

  await writeFile("expenses.json", expenses);

  res.redirect("/");
});

router.patch("/expenses/:id", async (req, res) => {});

export default router;
