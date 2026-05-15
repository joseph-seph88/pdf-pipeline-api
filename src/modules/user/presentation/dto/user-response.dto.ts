import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { UserEntity } from '../../domain/entities/user.entity';

export class UserResponseDto {
  @ApiProperty({ example: 'uuid-string', description: '유저 ID' })
  id: string;

  @ApiProperty({ example: 'user@example.com', description: '이메일' })
  email: string;

  @ApiProperty({ example: '홍길동', description: '이름' })
  name: string;

  @ApiPropertyOptional({ example: '길동이', description: '닉네임', nullable: true })
  nickname: string | null;

  @ApiPropertyOptional({ example: 'https://example.com/image.jpg', description: '프로필 이미지 URL', nullable: true })
  profileImage: string | null;

  @ApiProperty({ example: true, description: '서비스 이용약관 동의 여부' })
  agreedToTerms: boolean;

  @ApiProperty({ example: true, description: '개인정보처리방침 동의 여부' })
  agreedToPrivacyPolicy: boolean;

  @ApiProperty({ example: '2024-01-01T00:00:00.000Z', description: '생성일' })
  createdAt: Date;

  @ApiProperty({ example: '2024-01-01T00:00:00.000Z', description: '수정일' })
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
