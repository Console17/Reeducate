import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { AuthPayload } from './payload/auth.payload';
import { SignUpInput } from './dto/sign-up.input';
import { SignInInput } from './dto/sign-in.input';
import { UseGuards } from '@nestjs/common';
import { IsAuthGuard } from './guards/is-auth.guard';
import { UserPayload } from 'src/users/payload/user.payload';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => AuthPayload)
  signUp(@Args('signUpInput') signUpInput: SignUpInput) {
    return this.authService.signUp(signUpInput);
  }

  @Mutation(() => AuthPayload)
  signIn(@Args('signInInput') signInInput: SignInInput) {
    return this.authService.signIn(signInInput);
  }

  @Query(() => UserPayload)
  @UseGuards()
  currentUser(@Context() context: { req: { userId: string } }) {
    return this.authService.currentUser(context.req.userId);
  }
}
