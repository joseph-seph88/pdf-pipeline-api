import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AUTH_REPOSITORY } from '../../domain/repositories/auth.repository.interface';
import type { IAuthRepository } from '../../domain/repositories/auth.repository.interface';
import { AccountDeactivatedException } from '../../../../shared/exceptions/app.exceptions';

@Injectable()
export class LoginUseCase {
  private static readonly DUMMY_HASH =
    '$2b$10$abcdefghijklmnopqrstuvuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu';

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
      await bcrypt.compare(plainPassword, LoginUseCase.DUMMY_HASH);
      throw new UnauthorizedException('Invalid credentials');
    }

    if (user.deletedAt !== null) {
      await bcrypt.compare(plainPassword, LoginUseCase.DUMMY_HASH);
      throw new AccountDeactivatedException();
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
