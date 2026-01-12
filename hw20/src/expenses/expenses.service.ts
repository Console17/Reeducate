import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { QueryParamsDto } from './dto/query-params.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Expsense } from './schema/expsenses.schema';
import { Model } from 'mongoose';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class ExpensesService {
  constructor(
    @InjectModel(Expsense.name)
    private expenseModel: Model<Expsense>,

    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,
  ) {}

  async getAllExpenses({ page, take, priceFrom, priceTo }: QueryParamsDto) {
    let filter: any = {};

    if (priceFrom) filter.price = { $gte: priceFrom };

    if (priceTo) filter.price = { ...(filter.price || {}), $lte: priceTo };

    const skip = (page - 1) * take;
    const [expenses, total] = await Promise.all([
      this.expenseModel
        .find(filter)
        .skip(skip)
        .limit(take)
        .populate({ path: 'user', select: '-expenses' }),
      this.expenseModel.countDocuments(filter),
    ]);
    return {
      page,
      take,
      total,
      expenses,
    };
  }

  async createExpense(dto: CreateExpenseDto) {
    const totalPrice = dto.quantity * dto.price;

    const newExpense = await this.expenseModel.create({
      ...dto,
      totalPrice,
    });

    await this.usersService.addExpenseToUser(newExpense._id, dto.user);
    return newExpense;
  }

  async getExpenseById(expenseId: string) {
    const expense = await this.expenseModel.findById(expenseId);
    if (!expense) {
      throw new NotFoundException('Expense not found');
    }
    return expense;
  }

  async deleteExpenseById(expenseId: string) {
    const expense = await this.expenseModel.findByIdAndDelete(expenseId);
    if (!expense) {
      throw new NotFoundException('Expense not found');
    }
    return expense;
  }

  async updateExpenseById(
    expenseId: string,
    updateExpenseDto: UpdateExpenseDto,
  ) {
    const expense = await this.expenseModel.findById(expenseId);
    if (!expense) throw new NotFoundException('Expense not found');

    if (updateExpenseDto.quantity !== undefined)
      expense.quantity = updateExpenseDto.quantity;
    if (updateExpenseDto.price !== undefined)
      expense.price = updateExpenseDto.price;
    if (updateExpenseDto.category) expense.category = updateExpenseDto.category;
    if (updateExpenseDto.productName)
      expense.productName = updateExpenseDto.productName;

    return expense.save();
  }
}
