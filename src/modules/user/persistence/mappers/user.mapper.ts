import { Prisma } from '@prisma/client';
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

export type UserRecord = Prisma.UserGetPayload<{
  select: typeof USER_SELECT;
}>;

export { USER_SELECT };

export class UserMapper {
  static toEntity(record: UserRecord): UserEntity {
    return new UserEntity(
      record.id,
      record.email,
      record.name,
      record.nickname,
      record.profileImage,
      record.agreedToTerms,
      record.agreedToPrivacyPolicy,
      record.createdAt,
      record.updatedAt,
      record.deletedAt,
    );
  }
}
