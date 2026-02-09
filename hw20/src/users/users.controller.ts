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

  @Delete('me')
  @UseGuards(IsAuthGuard)
  deleteMe(@UserId() userId) {
    return this.userService.deleteUserById(userId);
  }

  @Delete(':id')
  @UseGuards(IsAuthGuard, RolesGuard)
  @Roles('admin')
  deleteUserById(@Param() { id }: isValidObjectId) {
    return this.userService.deleteUserById(id);
  }

  @Patch('me')
  @UseGuards(IsAuthGuard)
  updateMe(@UserId() userId, @Body() dto: UpdateUserDto) {
    return this.userService.updateUserById(userId, dto);
  }

  @Patch(':id')
  @UseGuards(IsAuthGuard, RolesGuard)
  @Roles('admin')
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
