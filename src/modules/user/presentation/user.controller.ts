/// <reference types="multer" />
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Patch,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { GetUserUseCase } from '../application/use-cases/get-user.use-case';
import { UpdateUserUseCase } from '../application/use-cases/update-user.use-case';
import { DeleteUserUseCase } from '../application/use-cases/delete-user.use-case';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { JwtAuthGuard } from '../../../shared/guards/jwt-auth.guard';
import { CurrentUser } from '../../../shared/decorators/current-user.decorator';
import type { JwtPayload } from '../../../infrastructure/jwt/jwt-payload.interface';
import { ApiWrappedResponse } from '../../../shared/decorators/api-wrapped-response.decorator';
import { FILE_STORAGE_REPOSITORY } from '../../document/domain/repositories/file-storage.repository.interface';
import type { IFileStorageRepository } from '../../document/domain/repositories/file-storage.repository.interface';

const ALLOWED_IMAGE_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/webp',
];

@ApiTags('유저')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UserController {
  constructor(
    private readonly getUserUseCase: GetUserUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,
    @Inject(FILE_STORAGE_REPOSITORY)
    private readonly fileStorageRepository: IFileStorageRepository,
  ) {}

  @Get('me')
  @ApiOperation({ summary: '내 정보 조회' })
  @ApiWrappedResponse(UserResponseDto, 200)
  @ApiResponse({ status: 401, description: '인증 실패' })
  async getMe(@CurrentUser() user: JwtPayload) {
    const entity = await this.getUserUseCase.execute(user.sub);
    return UserResponseDto.fromEntity(entity);
  }

  @Patch('me')
  @ApiOperation({ summary: '내 정보 수정' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        nickname: { type: 'string', example: '길동이' },
        profileImage: {
          type: 'string',
          format: 'binary',
          description: '프로필 이미지',
        },
      },
    },
  })
  @ApiWrappedResponse(UserResponseDto, 200)
  @ApiResponse({ status: 401, description: '인증 실패' })
  @ApiResponse({ status: 422, description: '변경할 항목 없음' })
  @UseInterceptors(
    FileInterceptor('profileImage', { limits: { fileSize: 5 * 1024 * 1024 } }),
  )
  async updateMe(
    @CurrentUser() user: JwtPayload,
    @Body() dto: UpdateUserDto,
    @UploadedFile() profileImageFile?: Express.Multer.File,
  ) {
    let profileImage: string | undefined;
    if (profileImageFile) {
      if (!ALLOWED_IMAGE_MIME_TYPES.includes(profileImageFile.mimetype)) {
        throw new BadRequestException(
          '이미지 파일만 업로드 가능합니다. (jpeg, png, gif, webp)',
        );
      }
      const result = await this.fileStorageRepository.uploadImage(
        profileImageFile.buffer,
        user.sub,
        profileImageFile.mimetype,
      );
      profileImage = result.url;
    }

    const entity = await this.updateUserUseCase.execute({
      id: user.sub,
      nickname: dto.nickname,
      profileImage,
    });
    return UserResponseDto.fromEntity(entity);
  }

  @Delete('me')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: '회원 탈퇴' })
  @ApiResponse({ status: 204, description: '탈퇴 완료' })
  @ApiResponse({ status: 401, description: '인증 실패' })
  async deleteMe(@CurrentUser() user: JwtPayload) {
    await this.deleteUserUseCase.execute(user.sub);
  }
}
