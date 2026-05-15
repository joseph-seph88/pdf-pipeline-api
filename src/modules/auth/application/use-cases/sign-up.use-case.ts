import { ConflictException, Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AUTH_REPOSITORY } from '../../domain/repositories/auth.repository.interface';
import type { IAuthRepository } from '../../domain/repositories/auth.repository.interface';
import { DomainException } from '../../../../shared/exceptions/app.exceptions';

export interface SignUpInput {
  email: string;
  password: string;
  name: string;
  nickname?: string;
  agreedToTerms: boolean;
  agreedToPrivacyPolicy: boolean;
}

@Injectable()
export class SignUpUseCase {
  constructor(
    @Inject(AUTH_REPOSITORY)
    private readonly authRepository: IAuthRepository,
  ) {}

  async execute(input: SignUpInput): Promise<void> {
    if (!input.agreedToTerms || !input.agreedToPrivacyPolicy) {
      throw new DomainException('약관 및 개인정보처리방침에 동의해야 합니다');
    }

    const existing = await this.authRepository.findByEmail(
      input.email.toLowerCase(),
    );
    if (existing) {
      throw new ConflictException('Email already in use');
    }

    const hashed = await bcrypt.hash(input.password, 10);
    await this.authRepository.create({
      email: input.email.toLowerCase(),
      hashedPassword: hashed,
      name: input.name,
      nickname: input.nickname,
      agreedToTerms: input.agreedToTerms,
      agreedToPrivacyPolicy: input.agreedToPrivacyPolicy,
    });
  }
}
