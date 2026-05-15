import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { USER_REPOSITORY } from '../../domain/repositories/user.repository.interface';
import type { IUserRepository } from '../../domain/repositories/user.repository.interface';
import { UserEntity } from '../../domain/entities/user.entity';
import { DomainException } from '../../../../shared/exceptions/app.exceptions';

export interface UpdateUserInput {
  id: string;
  nickname?: string;
  profileImage?: string;
}

@Injectable()
export class UpdateUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(input: UpdateUserInput): Promise<UserEntity> {
    if (input.nickname === undefined && input.profileImage === undefined) {
      throw new DomainException('변경할 항목을 하나 이상 입력해주세요');
    }

    const user = await this.userRepository.findById(input.id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.userRepository.update(input.id, {
      nickname: input.nickname,
      profileImage: input.profileImage,
    });
  }
}
