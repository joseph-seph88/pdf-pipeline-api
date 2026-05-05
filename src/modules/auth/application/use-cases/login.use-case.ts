import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AUTH_REPOSITORY } from '../../domain/repositories/auth.repository.interface';
import type { IAuthRepository } from '../../domain/repositories/auth.repository.interface';

@Injectable()
export class LoginUseCase {
  constructor(
    @Inject(AUTH_REPOSITORY)
    private readonly authRepository: IAuthRepository,
    private readonly jwtService: JwtService,
  ) {}

  async execute(
    email: string,
    plainPassword: string,
  ): Promise<{ accessToken: string }> {
    const user = await this.authRepository.findByEmail(email.toLowerCase());
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isValid = await bcrypt.compare(plainPassword, user.password);
    if (!isValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const accessToken = this.jwtService.sign({
      sub: user.id,
      email: user.email,
    });
    return { accessToken };
  }
}
