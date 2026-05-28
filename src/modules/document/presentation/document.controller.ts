/// <reference types="multer" />
import {
  BadRequestException,
  Controller,
  Get,
  Inject,
  Post,
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
import { JwtAuthGuard } from '../../../shared/guards/jwt-auth.guard';
import { CurrentUser } from '../../../shared/decorators/current-user.decorator';
import type { JwtPayload } from '../../../infrastructure/jwt/jwt-payload.interface';
import { FILE_STORAGE_REPOSITORY } from '../domain/repositories/file-storage.repository.interface';
import type { IFileStorageRepository } from '../domain/repositories/file-storage.repository.interface';
import { UploadDocumentUseCase } from '../application/use-cases/upload-document.use-case';
import { GetDocumentsUseCase } from '../application/use-cases/get-documents.use-case';
import { DocumentResponseDto } from './dto/document-response.dto';
import { ApiWrappedResponse } from '../../../shared/decorators/api-wrapped-response.decorator';

@ApiTags('내파일')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('documents')
export class DocumentController {
  constructor(
    private readonly uploadDocumentUseCase: UploadDocumentUseCase,
    private readonly getDocumentsUseCase: GetDocumentsUseCase,
    @Inject(FILE_STORAGE_REPOSITORY)
    private readonly fileStorageRepository: IFileStorageRepository,
  ) {}

  @Post()
  @ApiOperation({ summary: 'PDF 파일 업로드' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: { file: { type: 'string', format: 'binary' } },
    },
  })
  @ApiWrappedResponse(DocumentResponseDto, 201)
  @ApiResponse({ status: 400, description: 'PDF 파일만 허용 / 파일 없음' })
  @ApiResponse({ status: 401, description: '인증 실패' })
  @UseInterceptors(
    FileInterceptor('file', {
      limits: { fileSize: 50 * 1024 * 1024 },
    }),
  )
  async upload(
    @CurrentUser() user: JwtPayload,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<DocumentResponseDto> {
    if (!file) {
      throw new BadRequestException('파일이 없습니다.');
    }
    const entity = await this.uploadDocumentUseCase.execute({
      userId: user.sub,
      originalName: (() => {
        try {
          return decodeURIComponent(file.originalname);
        } catch {
          return file.originalname;
        }
      })(),
      buffer: file.buffer,
      mimeType: file.mimetype,
      fileSize: file.size,
    });
    const downloadUrl = await this.fileStorageRepository.getPresignedUrl(
      entity.s3Key,
    );
    return DocumentResponseDto.fromEntity(entity, downloadUrl);
  }

  @Get()
  @ApiOperation({ summary: '내 파일 목록 조회' })
  @ApiWrappedResponse(DocumentResponseDto, 200, true)
  @ApiResponse({ status: 401, description: '인증 실패' })
  async getMyDocuments(
    @CurrentUser() user: JwtPayload,
  ): Promise<DocumentResponseDto[]> {
    const entities = await this.getDocumentsUseCase.execute(user.sub);
    return Promise.all(
      entities.map(async (e) => {
        const downloadUrl = await this.fileStorageRepository.getPresignedUrl(
          e.s3Key,
        );
        return DocumentResponseDto.fromEntity(e, downloadUrl);
      }),
    );
  }
}
