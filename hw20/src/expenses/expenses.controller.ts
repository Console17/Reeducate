import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { QueryParamsDto } from './dto/query-params.dto';
import { isValidObjectId } from 'src/common/dto/is-valid-object-id.dto';
import { IsAuthGuard } from 'src/guards/is-auth.guard';
import { UserId } from 'src/decorators/user-id.decorator';

@Controller('/expenses')
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @Get()
  getAllExpenses(@Query() query: QueryParamsDto) {
    return this.expensesService.getAllExpenses(query);
  }

  @Post()
  @UseGuards(IsAuthGuard)
  createExpense(@Body() createExpenseDto: CreateExpenseDto, @UserId() userId) {
    return this.expensesService.createExpense(createExpenseDto, userId);
  }

  @Get(':id')
  @UseGuards(IsAuthGuard)
  getExpenseById(@Param() { id }: isValidObjectId, @UserId() userId) {
    return this.expensesService.getExpenseById(id, userId);
  }

  @Delete(':id')
  @UseGuards(IsAuthGuard)
  deleteExpenseById(@Param() { id }: isValidObjectId, @UserId() userId) {
    return this.expensesService.deleteExpenseById(id, userId);
  }

  @Patch(':id')
  @UseGuards(IsAuthGuard)
  updateExpenseById(
    @Param() { id }: isValidObjectId,
    @Body() updateExpenseDto: UpdateExpenseDto,
    @UserId() userId,
  ) {
    return this.expensesService.updateExpenseById(id, updateExpenseDto, userId);
  }
}
