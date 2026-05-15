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
  @IsEmail()
  @MaxLength(254)
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(72)
  @Matches(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])/, {
    message:
      '비밀번호는 영문자, 숫자, 특수문자(@$!%*?&)를 각각 하나 이상 포함해야 합니다',
  })
  password: string;

  @IsString()
  @MinLength(2)
  @MaxLength(50)
  name: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  nickname?: string;

  @IsBoolean()
  @Equals(true, { message: '서비스 이용약관에 동의해야 합니다' })
  agreedToTerms: boolean;

  @IsBoolean()
  @Equals(true, { message: '개인정보처리방침에 동의해야 합니다' })
  agreedToPrivacyPolicy: boolean;
}
