import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { QueryParamsDto } from './dto/query-params.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Expsense } from './schema/expsenses.schema';
import { Model } from 'mongoose';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/schema/users.schema';
import { TopSpendersDto } from './dto/top-spenders.dto';

@Injectable()
export class ExpensesService {
  constructor(
    @InjectModel(Expsense.name)
    private expenseModel: Model<Expsense>,

    @InjectModel(User.name)
    private userModel: Model<User>,

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

  async getExpenseGroup() {
    return this.expenseModel.aggregate([
      {
        $group: {
          _id: '$category',
          totalAmount: { $sum: '$totalPrice' },
          itemsCount: { $sum: 1 },
        },
      },
    ]);
  }

  async getTopSpenders({ limit }: TopSpendersDto) {
    return this.expenseModel.aggregate([
      {
        $group: {
          _id: '$user',
          totalSpent: { $sum: '$totalPrice' },
          itemsCount: { $sum: 1 },
        },
      },
      {
        $limit: limit,
      },
    ]);
  }

  async createExpense(dto: CreateExpenseDto, userId) {
    const totalPrice = dto.quantity * dto.price;

    const newExpense = await this.expenseModel.create({
      ...dto,
      user: userId,
      totalPrice,
    });

    await this.usersService.addExpenseToUser(newExpense._id, userId);
    return newExpense;
  }

  async getExpenseById(expenseId, userId, role) {
    const expense = await this.expenseModel.findById(expenseId);
    if (!expense) {
      throw new NotFoundException('Expense not found');
    }

    if (expense.user !== userId) {
      throw new UnauthorizedException('permition denied');
    }
    return expense;
  }

  async deleteExpenseById(expenseId, userId, role) {
    const existExpense = await this.expenseModel.findById(expenseId);
    if (!existExpense) {
      throw new NotFoundException('Expense not found');
    }
    if (existExpense.user !== userId && role !== 'admin') {
      throw new UnauthorizedException('permition denied');
    }
    const expense = await this.expenseModel.findByIdAndDelete(expenseId);

    await this.userModel.findByIdAndUpdate(userId, {
      $pull: { expenses: expense?._id },
    });
    return expense;
  }

  async updateExpenseById(expenseId, updateExpenseDto, userId, role) {
    const expense = await this.expenseModel.findById(expenseId);
    if (!expense) throw new NotFoundException('Expense not found');

    if (expense.user !== userId && role !== 'admin') {
      throw new UnauthorizedException('permition denied');
    }

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
