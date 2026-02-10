import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { QueryParamsDto } from './dto/query-params.dto';
import { isValidObjectId } from 'src/common/dto/is-valid-object-id.dto';
import { IsAuthGuard } from 'src/guards/is-auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { UserId } from 'src/decorators/user-id.decorator';
import {
  ApiBearerAuth,
  ApiBody,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@Controller('/users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}
  @Get()
  @ApiResponse({
    status: 200,
    example: {
      page: 1,
      take: 30,
      users: [
        {
          _id: '6964d96f05770e4ee6df492b',
          role: 'user',
          expenses: [
            {
              _id: '6989e77216f093017c403297',
              category: 'gym',
              productName: 'phone',
              quantity: 24,
              price: 200,
              totalPrice: 2000,
              __v: 0,
            },
          ],
          firstname: 'guga',
          lastname: 'doe',
          age: 24,
          gender: 'male',
          email: 'email@gmail.com',
          phoneNumber: 999999,
          subscriptionStartDate: '2026-01-12T11:22:23.595Z',
          subscriptionEndDate: '2026-02-12T11:22:23.595Z"',
          __v: 0,
          isActive: true,
        },
      ],
    },
  })
  @ApiQuery({
    name: 'page',
    required: false,
    example: '1',
    type: String,
  })
  @ApiQuery({
    name: 'take',
    required: false,
    example: '30',
    type: String,
  })
  @ApiQuery({
    name: 'gender',
    required: false,
    example: 'male',
    type: String,
  })
  @ApiQuery({
    name: 'email',
    required: false,
    example: 'mail@gmail.com',
    type: String,
  })
  getAllUsers(@Query() query: QueryParamsDto) {
    return this.userService.getAllUsers(query);
  }

  @Get('/statistic')
  @ApiOkResponse({
    example: [
      {
        _id: 'male',
        avgAge: 24,
      },
    ],
  })
  getUsersGender() {
    return this.userService.getUsersGender();
  }

  @Get(':id')
  @ApiParam({ name: 'id', example: '6964d96f05770e4ee6df492b', required: true })
  @ApiNotFoundResponse({ example: 'User nor found!!!!!!!!!!!!!!' })
  @ApiOkResponse({
    example: {
      _id: '6964d96f05770e4ee6df492b',
      firstName: 'guga',
      lastName: 'doe',
      age: 24,
      gender: 'male',
      email: 'email@gmail.com',
      phoneNumber: 999999,
      role: 'user',
      subscriptionStartDate: '2026-01-12T11:22:23.595Z',
      subscriptionEndDate: '2026-02-12T11:22:23.595Z',
      expenses: [],
      __v: 0,
      isActive: true,
    },
  })
  getUserById(@Param() { id }: isValidObjectId) {
    return this.userService.getUserById(id);
  }

  @Delete('me')
  @UseGuards(IsAuthGuard)
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({ example: 'permition denied' })
  @ApiOkResponse({
    example: {
      _id: '6964d96f05770e4ee6df492b',
      firstName: 'guga',
      lastName: 'doe',
      age: 24,
      gender: 'male',
      email: 'email@gmail.com',
      phoneNumber: 999999,
      role: 'user',
      subscriptionStartDate: '2026-01-12T11:22:23.595Z',
      subscriptionEndDate: '2026-02-12T11:22:23.595Z',
      expenses: [],
      __v: 0,
      isActive: true,
    },
  })
  deleteMe(@UserId() userId) {
    return this.userService.deleteUserById(userId);
  }

  @Delete(':id')
  @UseGuards(IsAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({ example: 'permition denied' })
  @ApiForbiddenResponse({ example: 'permission denied' })
  @ApiParam({ name: 'id', example: '6964d96f05770e4ee6df492b', required: true })
  @ApiNotFoundResponse({ example: 'User nor found!!!!!!!!!!!!!!' })
  @ApiOkResponse({
    example: {
      _id: '6964d96f05770e4ee6df492b',
      firstName: 'guga',
      lastName: 'doe',
      age: 24,
      gender: 'male',
      email: 'email@gmail.com',
      phoneNumber: 999999,
      role: 'user',
      subscriptionStartDate: '2026-01-12T11:22:23.595Z',
      subscriptionEndDate: '2026-02-12T11:22:23.595Z',
      expenses: [],
      __v: 0,
      isActive: true,
    },
  })
  deleteUserById(@Param() { id }: isValidObjectId) {
    return this.userService.deleteUserById(id);
  }

  @Patch('me')
  @UseGuards(IsAuthGuard)
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({ example: 'permition denied' })
  @ApiOkResponse({
    example: {
      _id: '6964d96f05770e4ee6df492b',
      firstName: 'updated',
      lastName: 'doe',
      age: 24,
      gender: 'male',
      email: 'email@gmail.com',
      phoneNumber: 999999,
      role: 'user',
      subscriptionStartDate: '2026-01-12T11:22:23.595Z',
      subscriptionEndDate: '2026-02-12T11:22:23.595Z',
      expenses: [],
      __v: 0,
      isActive: true,
    },
  })
  updateMe(@UserId() userId, @Body() dto: UpdateUserDto) {
    return this.userService.updateUserById(userId, dto);
  }

  @Patch(':id')
  @UseGuards(IsAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({ example: 'permition denied' })
  @ApiForbiddenResponse({ example: 'permission denied' })
  @ApiParam({ name: 'id', example: '6964d96f05770e4ee6df492b', required: true })
  @ApiNotFoundResponse({ example: 'User not found' })
  @ApiOkResponse({
    example: {
      _id: '6964d96f05770e4ee6df492b',
      firstName: 'updated',
      lastName: 'doe',
      age: 24,
      gender: 'male',
      email: 'email@gmail.com',
      phoneNumber: 999999,
      role: 'user',
      subscriptionStartDate: '2026-01-12T11:22:23.595Z',
      subscriptionEndDate: '2026-02-12T11:22:23.595Z',
      expenses: [],
      __v: 0,
      isActive: true,
    },
  })
  updateUserById(
    @Param() { id }: isValidObjectId,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.updateUserById(id, updateUserDto);
  }

  @Post('upgrade-subscription')
  @ApiNotFoundResponse({ example: 'User nor found!!!!!!!!!!!!!!' })
  @ApiOkResponse({
    example: {
      _id: '6964d96f05770e4ee6df492b',
      firstName: 'guga',
      lastName: 'doe',
      age: 24,
      gender: 'male',
      email: 'email@gmail.com',
      phoneNumber: 999999,
      role: 'user',
      subscriptionStartDate: '2026-02-10T11:22:23.595Z',
      subscriptionEndDate: '2026-03-10T11:22:23.595Z',
      expenses: [],
      __v: 0,
      isActive: true,
    },
  })
  upgradeSubscription(@Body('email') email: string) {
    return this.userService.upgradeSubscription(email);
  }
}
