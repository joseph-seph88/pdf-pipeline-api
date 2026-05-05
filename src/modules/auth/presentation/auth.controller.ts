import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { LoginUseCase } from '../application/use-cases/login.use-case';
import { SignUpUseCase } from '../application/use-cases/sign-up.use-case';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/sign-up.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly loginUseCase: LoginUseCase,
    private readonly signUpUseCase: SignUpUseCase,
  ) {}

  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.loginUseCase.execute(dto.email, dto.password);
  }

  @Post('sign-up')
  @HttpCode(HttpStatus.CREATED)
  async signUp(@Body() dto: SignUpDto) {
    await this.signUpUseCase.execute(dto);
  }
}
