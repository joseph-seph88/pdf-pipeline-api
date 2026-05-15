import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginUseCase } from '../application/use-cases/login.use-case';
import { SignUpUseCase } from '../application/use-cases/sign-up.use-case';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/sign-up.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly loginUseCase: LoginUseCase,
    private readonly signUpUseCase: SignUpUseCase,
  ) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '로그인' })
  @ApiResponse({ status: 200, description: 'accessToken 반환' })
  @ApiResponse({ status: 401, description: '이메일 또는 비밀번호 불일치' })
  login(@Body() dto: LoginDto) {
    return this.loginUseCase.execute(dto.email, dto.password);
  }

  @Post('sign-up')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: '회원가입' })
  @ApiResponse({ status: 201, description: '회원가입 완료' })
  @ApiResponse({ status: 409, description: '이미 사용 중인 이메일' })
  async signUp(@Body() dto: SignUpDto) {
    await this.signUpUseCase.execute(dto);
    return { message: '회원가입이 완료되었습니다' };
  }
}
