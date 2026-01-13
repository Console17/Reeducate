import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { QueryParamsDto } from './dto/query-params.dto';
import { isValidObjectId } from 'src/common/dto/is-valid-object-id.dto';
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getAllUsers(@Query() query: QueryParamsDto) {
    return this.usersService.getAllUsers(query);
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Get('total-users')
  getTotalUsers() {
    return this.usersService.getTotalUsers();
  }

  @Get(':id')
  getUserById(@Param() { id }: isValidObjectId) {
    return this.usersService.getUserById(id);
  }

  @Delete(':id')
  deleteUserById(@Param() { id }: isValidObjectId) {
    return this.usersService.deleteUserById(id);
  }

  @Patch(':id')
  updateUserById(
    @Param() { id }: isValidObjectId,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.updateUserById(id, updateUserDto);
  }
}
