import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../infrastructure/prisma/prisma.service';
import {
  IUserRepository,
  UpdateUserParams,
} from '../../domain/repositories/user.repository.interface';
import { UserEntity } from '../../domain/entities/user.entity';
import { UserMapper, USER_SELECT } from '../mappers/user.mapper';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<UserEntity | null> {
    const user = await this.prisma.user.findUnique({
      where: { id, deletedAt: null },
      select: USER_SELECT,
    });
    if (!user) return null;
    return UserMapper.toEntity(user);
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const user = await this.prisma.user.findUnique({
      where: { email, deletedAt: null },
      select: USER_SELECT,
    });
    if (!user) return null;
    return UserMapper.toEntity(user);
  }

  async update(id: string, params: UpdateUserParams): Promise<UserEntity> {
    const user = await this.prisma.user.update({
      where: { id, deletedAt: null },
      data: { ...params },
      select: USER_SELECT,
    });
    return UserMapper.toEntity(user);
  }

  async softDelete(id: string): Promise<void> {
    await this.prisma.user.update({
      where: { id, deletedAt: null },
      data: { deletedAt: new Date() },
    });
  }
}
