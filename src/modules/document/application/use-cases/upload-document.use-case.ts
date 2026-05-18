import { Inject, Injectable, BadRequestException } from '@nestjs/common';
import { basename } from 'path';
import { DOCUMENT_REPOSITORY } from '../../domain/repositories/document.repository.interface';
import type { IDocumentRepository } from '../../domain/repositories/document.repository.interface';
import { FILE_STORAGE_REPOSITORY } from '../../domain/repositories/file-storage.repository.interface';
import type { IFileStorageRepository } from '../../domain/repositories/file-storage.repository.interface';
import { DocumentEntity } from '../../domain/entities/document.entity';

export interface UploadDocumentParams {
  userId: string;
  originalName: string;
  buffer: Buffer;
  mimeType: string;
  fileSize: number;
}

@Injectable()
export class UploadDocumentUseCase {
  constructor(
    @Inject(DOCUMENT_REPOSITORY)
    private readonly documentRepository: IDocumentRepository,
    @Inject(FILE_STORAGE_REPOSITORY)
    private readonly fileStorageRepository: IFileStorageRepository,
  ) {}

  async execute(params: UploadDocumentParams): Promise<DocumentEntity> {
    if (params.mimeType !== 'application/pdf') {
      throw new BadRequestException('PDF 파일만 업로드 가능합니다.');
    }

    const { url, key, fileName } = await this.fileStorageRepository.upload(
      params.buffer,
      params.userId,
      params.mimeType,
    );

    try {
      return await this.documentRepository.create({
        userId: params.userId,
        originalName: basename(params.originalName),
        fileName,
        s3Key: key,
fileSize: params.fileSize,
      });
    } catch (error) {
      await this.fileStorageRepository.delete(key).catch(() => {});
      throw error;
    }
  }
}
