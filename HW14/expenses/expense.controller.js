import { Router } from "express";
import { ExpenseService } from "./expense.service.js";
import isAdminMiddleware from "../middlewares/isAdmin.middleware.js";
import checkPostBody from "../middlewares/checkPostBody.js";
const expenseRouter = Router();

expenseRouter.get("/", ExpenseService.getAllExpenses);
expenseRouter.post("/", checkPostBody, ExpenseService.createExpense);
expenseRouter.delete("/:id", isAdminMiddleware, ExpenseService.deleteExpense);
expenseRouter.patch("/:id", ExpenseService.updateExpense);

export default expenseRouter;
