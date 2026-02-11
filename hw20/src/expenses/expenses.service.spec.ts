import { Test, TestingModule } from '@nestjs/testing';
import { ExpensesService } from './expenses.service';
import { getModelToken } from '@nestjs/mongoose';
import { Expsense } from './schema/expsenses.schema';
import { User } from 'src/users/schema/users.schema';
import { UsersService } from 'src/users/users.service';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';

describe('ExpensesService', () => {
  let expensesService: ExpensesService;

  const expenseModel = {
    find: jest.fn(),
    countDocuments: jest.fn(),
    aggregate: jest.fn(),
    create: jest.fn(),
    findById: jest.fn(),
    findByIdAndDelete: jest.fn(),
  };

  const userModel = {
    findByIdAndUpdate: jest.fn(),
  };

  const usersService = {
    addExpenseToUser: jest.fn(),
  };

  const expenseMock = {
    _id: 'e1',
    category: 'food',
    productName: 'bread',
    quantity: 2,
    price: 5,
    totalPrice: 10,
    user: 'u1',
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExpensesService,
        {
          provide: getModelToken(Expsense.name),
          useValue: expenseModel,
        },
        {
          provide: getModelToken(User.name),
          useValue: userModel,
        },
        {
          provide: UsersService,
          useValue: usersService,
        },
      ],
    }).compile();

    expensesService = module.get<ExpensesService>(ExpensesService);
  });

  it('should be defined', () => {
    expect(expensesService).toBeDefined();
  });

  describe('get all expenses', () => {
    it('should return expenses with pagination and totals', async () => {
      const populate = jest.fn().mockResolvedValue([expenseMock]);
      const limit = jest.fn().mockReturnValue({ populate });
      const skip = jest.fn().mockReturnValue({ limit });
      jest.spyOn(expenseModel, 'find').mockReturnValue({ skip } as any);
      jest.spyOn(expenseModel, 'countDocuments').mockResolvedValue(1);

      const result = await expensesService.getAllExpenses({
        page: 2,
        take: 10,
        priceFrom: 5,
        priceTo: 20,
      } as any);

      expect(expenseModel.find).toHaveBeenCalledWith({
        price: { $gte: 5, $lte: 20 },
      });
      expect(skip).toHaveBeenCalledWith(10);
      expect(limit).toHaveBeenCalledWith(10);
      expect(populate).toHaveBeenCalledWith({
        path: 'user',
        select: '-expenses',
      });
      expect(result).toEqual({
        page: 2,
        take: 10,
        total: 1,
        expenses: [expenseMock],
      });
    });
  });

  describe('get expense group', () => {
    it('should call aggregate', async () => {
      jest.spyOn(expenseModel, 'aggregate').mockResolvedValue(['ok']);

      const res = await expensesService.getExpenseGroup();

      expect(expenseModel.aggregate).toHaveBeenCalledTimes(1);
      expect(res).toEqual(['ok']);
    });
  });

  describe('get top spenders', () => {
    it('should call aggregate with limit', async () => {
      jest.spyOn(expenseModel, 'aggregate').mockResolvedValue(['ok']);

      const res = await expensesService.getTopSpenders({ limit: 2 } as any);

      expect(expenseModel.aggregate).toHaveBeenCalledTimes(1);
      expect(res).toEqual(['ok']);
    });
  });

  describe('create expense', () => {
    it('should create expense, add it to user, and return it', async () => {
      const dto = {
        category: 'food',
        productName: 'bread',
        quantity: 2,
        price: 5,
      };
      jest.spyOn(expenseModel, 'create').mockResolvedValue(expenseMock);
      jest.spyOn(usersService, 'addExpenseToUser').mockResolvedValue(undefined);

      const res = await expensesService.createExpense(dto as any, 'u1');

      expect(expenseModel.create).toHaveBeenCalledWith({
        ...dto,
        user: 'u1',
        totalPrice: 10,
      });
      expect(usersService.addExpenseToUser).toHaveBeenCalledWith('e1', 'u1');
      expect(res).toBe(expenseMock);
    });
  });

  describe('get expense by id', () => {
    it('should throw not found exception when expense not found', async () => {
      jest.spyOn(expenseModel, 'findById').mockResolvedValue(null);

      await expect(
        expensesService.getExpenseById('e1', 'u1', 'user'),
      ).rejects.toThrow(NotFoundException);
    });

    it('should throw unauthorized when expense belongs to another user', async () => {
      jest.spyOn(expenseModel, 'findById').mockResolvedValue({
        ...expenseMock,
        user: 'other',
      });

      await expect(
        expensesService.getExpenseById('e1', 'u1', 'user'),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('should return expense when user owns it', async () => {
      jest.spyOn(expenseModel, 'findById').mockResolvedValue(expenseMock);

      const res = await expensesService.getExpenseById('e1', 'u1', 'user');

      expect(expenseModel.findById).toHaveBeenCalledWith('e1');
      expect(res).toBe(expenseMock);
    });
  });

  describe('delete expense by id', () => {
    it('should throw not found exception when expense not found', async () => {
      jest.spyOn(expenseModel, 'findById').mockResolvedValue(null);

      await expect(
        expensesService.deleteExpenseById('e1', 'u1', 'user'),
      ).rejects.toThrow(NotFoundException);
    });

    it('should throw unauthorized when not owner and not admin', async () => {
      jest.spyOn(expenseModel, 'findById').mockResolvedValue({
        ...expenseMock,
        user: 'other',
      });

      await expect(
        expensesService.deleteExpenseById('e1', 'u1', 'user'),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('should delete expense and pull it from user', async () => {
      jest.spyOn(expenseModel, 'findById').mockResolvedValue(expenseMock);
      jest
        .spyOn(expenseModel, 'findByIdAndDelete')
        .mockResolvedValue(expenseMock);
      jest.spyOn(userModel, 'findByIdAndUpdate').mockResolvedValue(undefined);

      const res = await expensesService.deleteExpenseById('e1', 'u1', 'admin');

      expect(expenseModel.findByIdAndDelete).toHaveBeenCalledWith('e1');
      expect(userModel.findByIdAndUpdate).toHaveBeenCalledWith('u1', {
        $pull: { expenses: 'e1' },
      });
      expect(res).toBe(expenseMock);
    });
  });

  describe('update expense by id', () => {
    it('should throw not found exception when expense not found', async () => {
      jest.spyOn(expenseModel, 'findById').mockResolvedValue(null);

      await expect(
        expensesService.updateExpenseById('e1', {}, 'u1', 'user'),
      ).rejects.toThrow(NotFoundException);
    });

    it('should throw unauthorized when not owner and not admin', async () => {
      jest.spyOn(expenseModel, 'findById').mockResolvedValue({
        ...expenseMock,
        user: 'other',
      });

      await expect(
        expensesService.updateExpenseById('e1', {}, 'u1', 'user'),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('should update fields and save', async () => {
      const save = jest.fn().mockResolvedValue({
        ...expenseMock,
        quantity: 3,
        price: 6,
      });
      const doc: any = { ...expenseMock, save };
      jest.spyOn(expenseModel, 'findById').mockResolvedValue(doc);

      const res = await expensesService.updateExpenseById(
        'e1',
        { quantity: 3, price: 6 },
        'u1',
        'admin',
      );

      expect(doc.quantity).toBe(3);
      expect(doc.price).toBe(6);
      expect(save).toHaveBeenCalledTimes(1);
      expect(res.quantity).toBe(3);
    });
  });
});
