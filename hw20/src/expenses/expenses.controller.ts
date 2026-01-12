import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { QueryParamsDto } from './dto/query-params.dto';
import { isValidObjectId } from 'src/common/dto/is-valid-object-id.dto';

@Controller('/expenses')
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @Get()
  getAllExpenses(@Query() query: QueryParamsDto) {
    return this.expensesService.getAllExpenses(query);
  }

  @Post()
  createExpense(@Body() createExpenseDto: CreateExpenseDto) {
    return this.expensesService.createExpense(createExpenseDto);
  }

  @Get(':id')
  getExpenseById(@Param() { id }: isValidObjectId) {
    return this.expensesService.getExpenseById(id);
  }

  @Delete(':id')
  deleteExpenseById(@Param() { id }: isValidObjectId) {
    return this.expensesService.deleteExpenseById(id);
  }

  @Patch(':id')
  updateExpenseById(
    @Param() { id }: isValidObjectId,
    @Body() updateExpenseDto: UpdateExpenseDto,
  ) {
    return this.expensesService.updateExpenseById(id, updateExpenseDto);
  }
}
