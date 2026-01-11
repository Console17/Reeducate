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
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { QueryParamsDto } from './dto/query-params.dto';

@Controller('/users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}
  @Get()
  getAllUsers(@Query() query: QueryParamsDto) {
    return this.userService.getAllUsers(query);
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Get(':id')
  getUserById(@Param('id') id: string) {
    return this.userService.getUserById(Number(id));
  }

  @Delete(':id')
  deleteUserById(@Param('id') id: string) {
    return this.userService.deleteUserById(Number(id));
  }

  @Patch(':id')
  updateUserById(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.updateUserById(Number(id), updateUserDto);
  }

  @Post('upgrade-subscription')
  upgradeSubscription(@Body('email') email: string) {
    return this.userService.upgradeSubscription(email);
  }
}
