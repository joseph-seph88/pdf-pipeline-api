import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'user@example.com', description: '이메일' })
  @IsEmail()
  @MaxLength(254)
  email: string;

  @ApiProperty({ example: 'Password1!', description: '비밀번호' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(72)
  password: string;
}
