import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';
import { StatusType } from '../constants/status-type.constant';

const STATUS_TYPE_MAP: Record<number, string> = {
  400: StatusType.VALIDATION_ERROR,
  401: StatusType.UNAUTHORIZED,
  403: StatusType.FORBIDDEN,
  404: StatusType.NOT_FOUND,
  409: StatusType.ALREADY_EXISTS,
  422: StatusType.DOMAIN_ERROR,
  500: StatusType.INTERNAL_SERVER_ERROR,
  502: StatusType.HTTP_ERROR,
};

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    if (!(exception instanceof HttpException)) {
      this.logger.error(exception);
    }

    const exceptionResponse =
      exception instanceof HttpException ? exception.getResponse() : null;

    const body =
      typeof exceptionResponse === 'object' && exceptionResponse !== null
        ? (exceptionResponse as Record<string, unknown>)
        : {};

    const statusType =
      (body.statusType as string) ??
      STATUS_TYPE_MAP[status] ??
      StatusType.INTERNAL_SERVER_ERROR;

    const message = (body.message as string | string[] | null) ?? null;

    response.status(status).json({
      status_code: status,
      status_type: statusType,
      message,
      data: null,
    });
  }
}
