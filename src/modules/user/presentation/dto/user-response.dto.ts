import { UserEntity } from '../../domain/entities/user.entity';

export class UserResponseDto {
  id: string;
  email: string;
  name: string;
  nickname: string | null;
  profileImage: string | null;
  agreedToTerms: boolean;
  agreedToPrivacyPolicy: boolean;
  createdAt: Date;
  updatedAt: Date;

  static fromEntity(entity: UserEntity): UserResponseDto {
    const dto = new UserResponseDto();
    dto.id = entity.id;
    dto.email = entity.email;
    dto.name = entity.name;
    dto.nickname = entity.nickname;
    dto.profileImage = entity.profileImage;
    dto.agreedToTerms = entity.agreedToTerms;
    dto.agreedToPrivacyPolicy = entity.agreedToPrivacyPolicy;
    dto.createdAt = entity.createdAt;
    dto.updatedAt = entity.updatedAt;
    return dto;
  }
}
