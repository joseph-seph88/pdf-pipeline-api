import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPayload } from '../../infrastructure/jwt/jwt-payload.interface';

export const CurrentUser = createParamDecorator<JwtPayload>(
  (_data: unknown, ctx: ExecutionContext): JwtPayload => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
