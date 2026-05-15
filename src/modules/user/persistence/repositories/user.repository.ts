import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../infrastructure/prisma/prisma.service';
import {
  IUserRepository,
  UpdateUserParams,
} from '../../domain/repositories/user.repository.interface';
import { UserEntity } from '../../domain/entities/user.entity';

const USER_SELECT = {
  id: true,
  email: true,
  name: true,
  nickname: true,
  profileImage: true,
  agreedToTerms: true,
  agreedToPrivacyPolicy: true,
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
} as const;

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<UserEntity | null> {
    const user = await this.prisma.user.findUnique({
      where: { id, deletedAt: null },
      select: USER_SELECT,
    });
    if (!user) return null;
    return this.toEntity(user);
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const user = await this.prisma.user.findUnique({
      where: { email, deletedAt: null },
      select: USER_SELECT,
    });
    if (!user) return null;
    return this.toEntity(user);
  }

  async update(id: string, params: UpdateUserParams): Promise<UserEntity> {
    const user = await this.prisma.user.update({
      where: { id, deletedAt: null },
      data: { ...params },
      select: USER_SELECT,
    });
    return this.toEntity(user);
  }

  async softDelete(id: string): Promise<void> {
    await this.prisma.user.update({
      where: { id, deletedAt: null },
      data: { deletedAt: new Date() },
    });
  }

  private toEntity(user: {
    id: string;
    email: string;
    name: string;
    nickname: string | null;
    profileImage: string | null;
    agreedToTerms: boolean;
    agreedToPrivacyPolicy: boolean;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
  }): UserEntity {
    return new UserEntity(
      user.id,
      user.email,
      user.name,
      user.nickname,
      user.profileImage,
      user.agreedToTerms,
      user.agreedToPrivacyPolicy,
      user.createdAt,
      user.updatedAt,
      user.deletedAt,
    );
  }
}
