import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';

@Injectable()
export class ExpensesService {
  private expenses = [
    {
      id: 0,
      category: 'category',
      productName: 'productName',
      quantity: 2,
      price: 5,
      totalPrice: 10,
    },
  ];

  getAllExpenses() {
    return this.expenses;
  }

  createExpense({ category, productName, quantity, price }: CreateExpenseDto) {
    if (!category || !productName || !quantity || !price) {
      throw new HttpException(
        'Provide all expense data',
        HttpStatus.BAD_REQUEST,
      );
    }

    const lastId = this.expenses[this.expenses.length - 1]?.id || 0;
    const totalPrice = quantity * price;

    const newExpense = {
      id: lastId + 1,
      category,
      productName,
      quantity,
      price,
      totalPrice,
    };

    this.expenses.push(newExpense);
    return newExpense;
  }

  getExpenseById(expenseId: number) {
    const expense = this.expenses.find((el) => el.id === expenseId);
    if (!expense) {
      throw new NotFoundException('Expense not found');
    }
    return expense;
  }

  deleteExpenseById(expenseId: number) {
    const expenseIndex = this.expenses.findIndex((el) => el.id === expenseId);
    if (expenseIndex === -1) {
      throw new NotFoundException('Expense not found');
    }
    const deletedExpense = this.expenses.splice(expenseIndex, 1);
    return deletedExpense;
  }

  updateExpenseById(expenseId: number, updateExpenseDto: UpdateExpenseDto) {
    const expenseIndex = this.expenses.findIndex((el) => el.id === expenseId);
    if (expenseIndex === -1) {
      throw new NotFoundException('Expense not found');
    }

    const updateReq = {};

    if (updateExpenseDto.category)
      updateReq['category'] = updateExpenseDto.category;
    if (updateExpenseDto.productName)
      updateReq['productName'] = updateExpenseDto.productName;
    if (updateExpenseDto.quantity)
      updateReq['quantity'] = updateExpenseDto.quantity;
    if (updateExpenseDto.price) updateReq['price'] = updateExpenseDto.price;

    const updatedExpense = {
      ...this.expenses[expenseIndex],
      ...updateReq,
    };

    updatedExpense.totalPrice = updatedExpense.quantity * updatedExpense.price;

    this.expenses[expenseIndex] = updatedExpense;

    return updatedExpense;
  }
}
