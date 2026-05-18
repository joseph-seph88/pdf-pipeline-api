import { applyDecorators, Type } from '@nestjs/common';
import { ApiExtraModels, ApiResponse, getSchemaPath } from '@nestjs/swagger';
import { WrappedResponseDto } from '../dto/wrapped-response.dto';

export const ApiWrappedResponse = <T>(
  type: Type<T>,
  status = 200,
  isArray = false,
) =>
  applyDecorators(
    ApiExtraModels(WrappedResponseDto, type),
    ApiResponse({
      status,
      schema: {
        allOf: [
          { $ref: getSchemaPath(WrappedResponseDto) },
          {
            properties: {
              data: isArray
                ? { type: 'array', items: { $ref: getSchemaPath(type) } }
                : { $ref: getSchemaPath(type) },
            },
          },
        ],
      },
    }),
  );
