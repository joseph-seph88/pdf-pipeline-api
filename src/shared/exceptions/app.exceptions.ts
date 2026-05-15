import { HttpException, HttpStatus } from '@nestjs/common';
import { StatusType } from '../constants/status-type.constant';

export class DomainException extends HttpException {
  constructor(message?: string) {
    super(
      { statusType: StatusType.DOMAIN_ERROR, message: message ?? null },
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }
}

export class AuthRequiredException extends HttpException {
  constructor() {
    super(
      { statusType: StatusType.AUTH_REQUIRED, message: null },
      HttpStatus.UNAUTHORIZED,
    );
  }
}

export class InvalidTokenException extends HttpException {
  constructor() {
    super(
      { statusType: StatusType.INVALID_TOKEN, message: null },
      HttpStatus.UNAUTHORIZED,
    );
  }
}

export class AccountDeactivatedException extends HttpException {
  constructor() {
    super(
      { statusType: StatusType.ACCOUNT_DEACTIVATED, message: null },
      HttpStatus.UNAUTHORIZED,
    );
  }
}

export class HttpErrorException extends HttpException {
  constructor(message?: string) {
    super(
      { statusType: StatusType.HTTP_ERROR, message: message ?? null },
      HttpStatus.BAD_GATEWAY,
    );
  }
}
