import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getModelToken } from '@nestjs/mongoose';
import { User } from './schema/users.schema';
import { AwsS3Service } from 'src/aws-s3/aws-s3.service';
import { NotFoundException } from '@nestjs/common';

describe('UsersService', () => {
  let usersService: UsersService;

  const userModel = {
    findById: jest.fn(),
    findByIdAndDelete: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findOne: jest.fn(),
    countDocuments: jest.fn(),
    aggregate: jest.fn(),
    updateMany: jest.fn(),
    find: jest.fn(),
  };

  const awsS3Service = {
    uploadFile: jest.fn(),
    getFile: jest.fn(),
    deleteFile: jest.fn(),
  };

  const userMock = {
    _id: '123',
    firstName: 'John',
    lastName: 'Doe',
    age: 25,
    email: 'john@doe.com',
    phoneNumber: 123456789,
    gender: 'male',
    role: 'user',
    subscriptionStartDate: null,
    subscriptionEndDate: null,
    save: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();
    jest.spyOn(console, 'log').mockImplementation(() => undefined);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: AwsS3Service,
          useValue: awsS3Service,
        },
        {
          provide: getModelToken(User.name),
          useValue: userModel,
        },
      ],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(usersService).toBeDefined();
  });

  describe('get user by id', () => {
    it('should throw not found exception when user not found', async () => {
      const validId = '122222222222222222222222';
      jest.spyOn(userModel, 'findById').mockResolvedValue(null);

      await expect(usersService.getUserById(validId)).rejects.toThrow(
        NotFoundException,
      );
      expect(userModel.findById).toHaveBeenCalledWith(validId);
    });

    it('should return user', async () => {
      jest.spyOn(userModel, 'findById').mockResolvedValue(userMock);

      const user = await usersService.getUserById(userMock._id);

      expect(user._id).toBe(userMock._id);
      expect(userModel.findById).toHaveBeenCalledWith(userMock._id);
    });
  });

  describe('delete user by id', () => {
    it('should throw not found exception when user not found', async () => {
      const validId = '122222222222222222222222';
      jest.spyOn(userModel, 'findByIdAndDelete').mockResolvedValue(null);

      await expect(usersService.deleteUserById(validId)).rejects.toThrow(
        NotFoundException,
      );
      expect(userModel.findByIdAndDelete).toHaveBeenCalledWith(validId);
    });

    it('should delete and return user', async () => {
      jest.spyOn(userModel, 'findByIdAndDelete').mockResolvedValue(userMock);

      const deleted = await usersService.deleteUserById(userMock._id);

      expect(deleted).toBe(userMock);
      expect(userModel.findByIdAndDelete).toHaveBeenCalledWith(userMock._id);
    });
  });

  describe('update user by id', () => {
    it('should throw not found exception when user not found', async () => {
      const validId = '122222222222222222222222';
      const dto = { firstName: 'Updated' };
      jest.spyOn(userModel, 'findByIdAndUpdate').mockResolvedValue(null);

      await expect(
        usersService.updateUserById(validId, dto as any),
      ).rejects.toThrow(NotFoundException);
      expect(userModel.findByIdAndUpdate).toHaveBeenCalledWith(validId, dto, {
        new: true,
      });
    });

    it('should update and return user', async () => {
      const dto = { firstName: 'Updated' };
      const updatedUser = { ...userMock, ...dto };
      jest.spyOn(userModel, 'findByIdAndUpdate').mockResolvedValue(updatedUser);

      const user = await usersService.updateUserById(userMock._id, dto as any);

      expect(user).toEqual(updatedUser);
      expect(userModel.findByIdAndUpdate).toHaveBeenCalledWith(
        userMock._id,
        dto,
        {
          new: true,
        },
      );
    });
  });

  describe('get all users', () => {
    it('should return users with pagination', async () => {
      const execUsers = [{ ...userMock }];
      const populate = jest.fn().mockResolvedValue(execUsers);
      const limit = jest.fn().mockReturnValue({ populate });
      const skip = jest.fn().mockReturnValue({ limit });
      jest.spyOn(userModel, 'find').mockReturnValue({ skip } as any);
      jest.spyOn(userModel, 'countDocuments').mockResolvedValue(1);

      const result = await usersService.getAllUsers({
        page: 2,
        take: 10,
        gender: undefined,
        email: undefined,
      } as any);

      expect(userModel.find).toHaveBeenCalledWith({});
      expect(skip).toHaveBeenCalledWith(10);
      expect(limit).toHaveBeenCalledWith(10);
      expect(populate).toHaveBeenCalledWith({
        path: 'expenses',
        select: '-user',
      });
      expect(result).toEqual({
        page: 2,
        take: 10,
        total: 1,
        users: execUsers,
      });
    });
  });

  describe('get user by email', () => {
    it('should call findOne', async () => {
      jest.spyOn(userModel, 'findOne').mockResolvedValue(userMock);

      const user = await usersService.getUserByEmail(userMock.email);

      expect(userModel.findOne).toHaveBeenCalledWith({ email: userMock.email });
      expect(user).toBe(userMock);
    });
  });

  describe('upgrade subscription', () => {
    it('should throw not found exception when user not found', async () => {
      jest.spyOn(userModel, 'findOne').mockResolvedValue(null);

      await expect(usersService.upgradeSubscription('x@y.com')).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should set start/end dates when no active subscription', async () => {
      const user = {
        ...userMock,
        subscriptionStartDate: null,
        subscriptionEndDate: null,
        save: jest.fn().mockResolvedValue('saved'),
      };
      jest.spyOn(userModel, 'findOne').mockResolvedValue(user);

      const res = await usersService.upgradeSubscription(userMock.email);

      expect(userModel.findOne).toHaveBeenCalledWith({ email: userMock.email });
      expect(user.save).toHaveBeenCalledTimes(1);
      expect(res).toBe('saved');
      expect(user.subscriptionStartDate).toBeInstanceOf(Date);
      expect(user.subscriptionEndDate).toBeInstanceOf(Date);
    });
  });

  describe('add expense to user', () => {
    it('should push expense id into user', async () => {
      const updatedUser = { ...userMock, expenses: ['e1'] };
      jest.spyOn(userModel, 'findByIdAndUpdate').mockResolvedValue(updatedUser);

      const res = await usersService.addExpenseToUser('e1', userMock._id);

      expect(userModel.findByIdAndUpdate).toHaveBeenCalledWith(
        userMock._id,
        { $push: { expenses: 'e1' } },
        { new: true },
      );
      expect(res).toBe(updatedUser);
    });
  });

  describe('upload user photo', () => {
    it('should upload file and return url', async () => {
      const file = {
        mimetype: 'image/png',
        buffer: Buffer.from('a'),
      } as any;
      jest.spyOn(awsS3Service, 'uploadFile').mockResolvedValue('url');

      const res = await usersService.uploadUserPhoto(file);

      expect(awsS3Service.uploadFile).toHaveBeenCalledWith(
        expect.stringMatching(/^images\/.+\.png$/),
        file.buffer,
        file.mimetype,
      );
      expect(res).toBe('url');
    });
  });

  describe('files', () => {
    it('should get file', async () => {
      jest.spyOn(awsS3Service, 'getFile').mockResolvedValue('file');

      const res = await usersService.getFile('id');

      expect(awsS3Service.getFile).toHaveBeenCalledWith('id');
      expect(res).toBe('file');
    });

    it('should delete file', async () => {
      jest.spyOn(awsS3Service, 'deleteFile').mockResolvedValue('deleted');

      const res = await usersService.deleteFile('id');

      expect(awsS3Service.deleteFile).toHaveBeenCalledWith('id');
      expect(res).toBe('deleted');
    });
  });
});
