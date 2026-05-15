import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../infrastructure/prisma/prisma.service';
import {
  CreateAuthUserParams,
  IAuthRepository,
} from '../../domain/repositories/auth.repository.interface';

@Injectable()
export class AuthRepository implements IAuthRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(
    email: string,
  ): Promise<{ id: string; email: string; password: string; deletedAt: Date | null } | null> {
    const user = await this.prisma.user.findFirst({
      where: { email },
    });
    if (!user) return null;
    return { id: user.id, email: user.email, password: user.password, deletedAt: user.deletedAt };
  }

  async create(params: CreateAuthUserParams): Promise<void> {
    await this.prisma.user.create({
      data: {
        email: params.email,
        password: params.hashedPassword,
        name: params.name,
        nickname: params.nickname,
        agreedToTerms: params.agreedToTerms,
        agreedToPrivacyPolicy: params.agreedToPrivacyPolicy,
      },
    });
  }
}
