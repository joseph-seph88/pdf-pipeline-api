import { ApiProperty } from '@nestjs/swagger';
import { StatusType } from '../constants/status-type.constant';

export class WrappedResponseDto {
  @ApiProperty({ example: 200 })
  status_code: number;

  @ApiProperty({ enum: Object.values(StatusType), example: StatusType.SUCCESS })
  status_type: string;

  @ApiProperty({ additionalProperties: true })
  data: unknown;
}
