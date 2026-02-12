import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { UserPayload } from './payload/user.payload';
import { UpdateUserInput } from './dto/update-user.input';

@Resolver()
export class UserResolver {
  constructor(private userService: UsersService) {}

  @Query(() => [UserPayload])
  getAllUsers() {
    return this.userService.getAll();
  }

  @Mutation(() => UserPayload)
  updateUser(
    @Args('id') id: string,
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ) {
    return this.userService.updateUser(id, updateUserInput);
  }

  @Mutation(() => UserPayload)
  deleteUser(@Args('id') id: string) {
    return this.userService.deleteUser(id);
  }
}
