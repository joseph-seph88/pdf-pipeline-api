import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  Equals,
  IsBoolean,
  IsEmail,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class SignUpDto {
  @ApiProperty({ example: 'user@example.com', description: '이메일' })
  @IsEmail()
  @MaxLength(254)
  email: string;

  @ApiProperty({
    example: 'Password1!',
    description: '비밀번호 (영문자, 숫자, 특수문자 포함 8자 이상)',
  })
  @IsString()
  @MinLength(8)
  @MaxLength(72)
  @Matches(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])/, {
    message:
      '비밀번호는 영문자, 숫자, 특수문자(@$!%*?&)를 각각 하나 이상 포함해야 합니다',
  })
  password: string;

  @ApiProperty({ example: '홍길동', description: '이름 (2자 이상)' })
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  name: string;

  @ApiPropertyOptional({ example: '길동이', description: '닉네임' })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  nickname?: string;

  @ApiProperty({ example: true, description: '서비스 이용약관 동의' })
  @IsBoolean()
  @Equals(true, { message: '서비스 이용약관에 동의해야 합니다' })
  agreedToTerms: boolean;

  @ApiProperty({ example: true, description: '개인정보처리방침 동의' })
  @IsBoolean()
  @Equals(true, { message: '개인정보처리방침에 동의해야 합니다' })
  agreedToPrivacyPolicy: boolean;
}
