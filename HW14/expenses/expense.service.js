import readFile from "../utils/readFile.js";
import writeFile from "../utils/writeFile.js";
import { v4 as uuidv4 } from "uuid";

async function getAllExpenses(req, res) {
  const expenses = await readFile("expenses.json", true);
  console.log(req.query, "query");
  const page = Number(req.query.page) || 1;
  const take = Math.min(Number(req.query.take) || 5);
  res.json(expenses.slice((page - 1) * take, take * page));
}

async function createExpense(req, res) {
  const { category, price } = req.body;

  const expenses = await readFile("expenses.json", true);
  const newExpense = {
    id: uuidv4(),
    category,
    price,
  };

  expenses.push(newExpense);
  await writeFile("expenses.json", expenses);
  res.status(201).send("created new expense");
}

async function deleteExpense(req, res) {
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
}

async function updateExpense(req, res) {
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
}

export const ExpenseService = {
  getAllExpenses,
  createExpense,
  deleteExpense,
  updateExpense,
};
