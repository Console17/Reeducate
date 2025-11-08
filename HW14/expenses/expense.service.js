import expenseModel from "./expense.model.js";

async function getAllExpenses(req, res) {
  const queryParams = req.query || {};
  const filter = {};

  if ("category" in queryParams) {
    const categories = req.query.category.split(",");
    filter["category"] = { $in: categories };
  }
  if ("amountFrom" in queryParams) {
    filter["price"] = {
      ...filter["price"],
      $gte: Number(queryParams.amountFrom),
    };
  }
  if ("amountTo" in queryParams) {
    filter["price"] = {
      ...filter["price"],
      $lte: Number(queryParams.amountTo),
    };
  }
  const page = Number(req.query.page) || 1;
  const take = Math.min(Number(req.query.take) || 5);
  const expenses = await expenseModel
    .find(filter)
    .skip((page - 1) * take)
    .limit(take);

  res.json(expenses);
}

async function createExpense(req, res) {
  const { category, price } = req.body;
  const newExpense = await expenseModel.create({
    category,
    price,
  });

  return res.status(201).json({ success: true, data: newExpense });
}

async function getExpenseById(req, res) {
  const id = req.params.id;
  const expense = await expenseModel.findById(id);
  if (!expense) {
    return res.status(404).json({ message: "expense not found" });
  }
  res.json(expense);
}

async function deleteExpense(req, res) {
  const id = req.params.id;
  const deletedExpense = await expenseModel.findByIdAndDelete(id);
  if (!deletedExpense) {
    return res.status(404).json({ message: "expense not found" });
  }
  return res.json(deletedExpense);
}

async function updateExpense(req, res) {
  const id = req.params.id;
  const updatedExpense = await expenseModel.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!updatedExpense) {
    return res.status(404).json({ message: "expense not found" });
  }

  return res.json(updatedExpense);
}

async function getTopFiveExpense(req, res) {
  const topFiveExpenses = await expenseModel
    .find()
    .sort({ price: -1 })
    .limit(5);

  return res.json(topFiveExpenses);
}

export const ExpenseService = {
  getAllExpenses,
  createExpense,
  getExpenseById,
  deleteExpense,
  updateExpense,
  getTopFiveExpense,
};
