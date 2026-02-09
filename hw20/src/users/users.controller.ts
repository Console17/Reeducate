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
import { isValidObjectId } from 'src/common/dto/is-valid-object-id.dto';

@Controller('/users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}
  @Get()
  getAllUsers(@Query() query: QueryParamsDto) {
    return this.userService.getAllUsers(query);
  }

  @Get(':id')
  getUserById(@Param() { id }: isValidObjectId) {
    return this.userService.getUserById(id);
  }

  @Delete(':id')
  deleteUserById(@Param() { id }: isValidObjectId) {
    return this.userService.deleteUserById(id);
  }

  @Patch(':id')
  updateUserById(
    @Param() { id }: isValidObjectId,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.updateUserById(id, updateUserDto);
  }

  @Post('upgrade-subscription')
  upgradeSubscription(@Body('email') email: string) {
    return this.userService.upgradeSubscription(email);
  }
}
