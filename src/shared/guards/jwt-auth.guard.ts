import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  AuthRequiredException,
  InvalidTokenException,
} from '../exceptions/app.exceptions';
import type { JwtPayload } from '../../infrastructure/jwt/jwt-payload.interface';
import { JwtError } from '../constants/jwt-error.constant';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest<TUser = JwtPayload>(err: any, user: any, info: any): TUser {
    if (err || !user) {
      const isTokenError =
        info?.name === JwtError.EXPIRED || info?.name === JwtError.INVALID;
      throw isTokenError
        ? new InvalidTokenException()
        : new AuthRequiredException();
    }
    return user as TUser;
  }
}
