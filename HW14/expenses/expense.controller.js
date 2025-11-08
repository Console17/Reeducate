import { Router } from "express";
import { ExpenseService } from "./expense.service.js";
import isAdminMiddleware from "../middlewares/isAdmin.middleware.js";
import checkPostBody from "../middlewares/checkPostBody.js";
import isValidMongoId from "../middlewares/isValidMongoId.middleware.js";
const expenseRouter = Router();

expenseRouter.get("/", ExpenseService.getAllExpenses);
expenseRouter.get("/top-5", ExpenseService.getTopFiveExpense);
expenseRouter.post("/", checkPostBody, ExpenseService.createExpense);
expenseRouter.get("/:id", isValidMongoId, ExpenseService.getExpenseById);
expenseRouter.delete(
  "/:id",
  isAdminMiddleware,
  isValidMongoId,
  ExpenseService.deleteExpense
);
expenseRouter.patch("/:id", isValidMongoId, ExpenseService.updateExpense);

export default expenseRouter;
