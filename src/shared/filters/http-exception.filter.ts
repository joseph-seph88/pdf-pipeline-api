import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';

const STATUS_TYPE_MAP: Record<number, string> = {
  400: 'VALIDATION_ERROR',
  401: 'UNAUTHORIZED',
  403: 'UNAUTHORIZED',
  404: 'NOT_FOUND',
  409: 'ALREADY_EXISTS',
  500: 'INTERNAL_SERVER_ERROR',
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

    response.status(status).json({
      status_code: status,
      status_type: STATUS_TYPE_MAP[status] ?? 'INTERNAL_SERVER_ERROR',
      data: null,
    });
  }
}
