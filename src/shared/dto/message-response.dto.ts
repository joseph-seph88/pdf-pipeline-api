import { ApiProperty } from '@nestjs/swagger';

export class MessageResponseDto {
  @ApiProperty({ example: '처리가 완료되었습니다.' })
  message: string;
}
