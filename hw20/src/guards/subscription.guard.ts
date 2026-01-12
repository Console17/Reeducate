import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class SubscriptionGuard implements CanActivate {
  constructor(private readonly usersService: UsersService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const email = request.headers['email'];

    if (!email) {
      request.hasActiveSubscription = false;
      return true;
    }

    const user = await this.usersService.getUserByEmail(email);

    if (!user) {
      request.hasActiveSubscription = false;
      return true;
    }

    const now = new Date();
    const isActive =
      user.subscriptionEndDate && new Date(user.subscriptionEndDate) > now;

    request.hasActiveSubscription = isActive;

    return true;
  }
}
