import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';

@Controller('/expenses')
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @Get()
  getAllExpenses() {
    return this.expensesService.getAllExpenses();
  }

  @Post()
  createExpense(@Body() createExpenseDto: CreateExpenseDto) {
    return this.expensesService.createExpense(createExpenseDto);
  }

  @Get(':id')
  getExpenseById(@Param('id') id: string) {
    return this.expensesService.getExpenseById(Number(id));
  }

  @Delete(':id')
  deleteExpenseById(@Param('id') id: string) {
    return this.expensesService.deleteExpenseById(Number(id));
  }

  @Patch(':id')
  updateExpenseById(
    @Param('id') id: string,
    @Body() updateExpenseDto: UpdateExpenseDto,
  ) {
    return this.expensesService.updateExpenseById(Number(id), updateExpenseDto);
  }
}
