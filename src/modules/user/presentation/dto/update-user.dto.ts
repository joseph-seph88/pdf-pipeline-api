import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateUserDto {
  @ApiPropertyOptional({ example: '길동이', description: '닉네임 (2자 이상)' })
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  nickname?: string;

  @ApiPropertyOptional({ example: 'https://example.com/image.jpg', description: '프로필 이미지 URL' })
  @IsOptional()
  @IsUrl()
  @MaxLength(2048)
  profileImage?: string;
}
