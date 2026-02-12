import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class IsAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const gqlContext = GqlExecutionContext.create(context);
    const req = gqlContext.getContext().req;

    const auth = req?.headers?.authorization;
    if (!auth) throw new UnauthorizedException('permition denied');

    const [type, token] = auth.split(' ');
    if (type !== 'Bearer' || !token) {
      throw new UnauthorizedException('permition denied');
    }

    try {
      const payload = this.jwtService.verify(token);
      req.userId = payload.userId;
      return true;
    } catch (error) {
      throw new UnauthorizedException('permition denied');
    }
  }
}
