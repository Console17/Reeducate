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
import { UserRole } from 'src/decorators/user-role.decorator';
import { TopSpendersDto } from './dto/top-spenders.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiQuery,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@Controller('/expenses')
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @Get()
  @ApiQuery({
    name: 'page',
    required: false,
    example: '1',
    type: String,
  })
  @ApiQuery({
    name: 'take',
    required: false,
    example: '10',
    type: String,
  })
  @ApiQuery({
    name: 'priceFrom',
    required: false,
    example: '1',
    type: String,
  })
  @ApiQuery({
    name: 'priceTo',
    required: false,
    example: '1000',
    type: String,
  })
  @ApiOkResponse({
    example: {
      page: 1,
      take: 10,
      total: 2,
      expenses: [
        {
          _id: '6989c890948387e654a8e16b',
          category: 'gym',
          productName: 'sdfg',
          quantity: 123,
          price: 22,
          totalPrice: 2706,
          user: {
            role: 'user',
            _id: '6989baeb1379955d948fbef8',
            firstName: 'guga',
            lastName: 'guga',
            email: 'guga1235@gmail.com',
            phoneNumber: 1234,
            gender: 'guga',
            subscriptionStartDate: '2026-02-09T10:46:03.046Z',
            subscriptionEndDate: '2026-03-09T10:46:03.046Z',
            __v: 0,
            isActive: false,
          },
          __v: 0,
        },
      ],
    },
  })
  getAllExpenses(@Query() query: QueryParamsDto) {
    return this.expensesService.getAllExpenses(query);
  }

  @Get('/statistic')
  @ApiOkResponse({
    example: [
      {
        _id: 'gym',
        totalAmount: 2706,
        itemsCount: 1,
      },
    ],
  })
  getExpenseGroup() {
    return this.expensesService.getExpenseGroup();
  }

  @Get('/top-spenders')
  @ApiQuery({
    name: 'limit',
    required: false,
    example: '10',
    type: String,
  })
  @ApiOkResponse({
    example: [
      {
        _id: '6989e3c8978f18b33bc0fa98',
        totalSpent: 2706,
        itemsCount: 1,
      },
    ],
  })
  getTopSpenders(@Query() query: TopSpendersDto) {
    return this.expensesService.getTopSpenders(query);
  }

  @Post()
  @UseGuards(IsAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({
    example: {
      _id: '6989c890948387e654a8e16b',
      category: 'gym',
      productName: 'sdfg',
      quantity: 123,
      price: 22,
      totalPrice: 2706,
    },
  })
  createExpense(@Body() createExpenseDto: CreateExpenseDto, @UserId() userId) {
    return this.expensesService.createExpense(createExpenseDto, userId);
  }

  @Get(':id')
  @UseGuards(IsAuthGuard)
  @ApiBearerAuth()
  @ApiParam({ name: 'id', example: '6989e75f16f093017c403291', required: true })
  @ApiNotFoundResponse({ example: 'expense not found' })
  @ApiUnauthorizedResponse({ example: 'permition denied' })
  @ApiOkResponse({
    example: {
      _id: '6989e75f16f093017c403291',
      category: 'gym',
      productName: '123',
      quantity: 123,
      price: 213,
      totalPrice: 26199,
      user: '6989e3c8978f18b33bc0fa98',
      __v: 0,
    },
  })
  getExpenseById(
    @Param() { id }: isValidObjectId,
    @UserId() userId,
    @UserRole() role,
  ) {
    return this.expensesService.getExpenseById(id, userId, role);
  }

  @Delete(':id')
  @UseGuards(IsAuthGuard)
  @ApiBearerAuth()
  @ApiParam({ name: 'id', example: '6989e75f16f093017c403291', required: true })
  @ApiNotFoundResponse({ example: 'expense not found' })
  @ApiUnauthorizedResponse({ example: 'permition denied' })
  @ApiOkResponse({
    example: {
      _id: '6989e75f16f093017c403291',
      category: 'gym',
      productName: '123',
      quantity: 123,
      price: 213,
      totalPrice: 26199,
      user: '6989e3c8978f18b33bc0fa98',
      __v: 0,
    },
  })
  deleteExpenseById(
    @Param() { id }: isValidObjectId,
    @UserId() userId,
    @UserRole() role,
  ) {
    return this.expensesService.deleteExpenseById(id, userId, role);
  }

  @Patch(':id')
  @UseGuards(IsAuthGuard)
  @ApiBearerAuth()
  @ApiParam({ name: 'id', example: '6989e75f16f093017c403291', required: true })
  @ApiNotFoundResponse({ example: 'expense not found' })
  @ApiUnauthorizedResponse({ example: 'permition denied' })
  @ApiOkResponse({
    example: {
      _id: '6989e75f16f093017c403291',
      category: 'gym',
      productName: '123',
      quantity: 123,
      price: 213,
      totalPrice: 26199,
      user: '6989e3c8978f18b33bc0fa98',
      __v: 0,
    },
  })
  updateExpenseById(
    @Param() { id }: isValidObjectId,
    @Body() updateExpenseDto: UpdateExpenseDto,
    @UserId() userId,
    @UserRole() role,
  ) {
    return this.expensesService.updateExpenseById(
      id,
      updateExpenseDto,
      userId,
      role,
    );
  }
}
