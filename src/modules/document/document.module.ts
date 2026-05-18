import { Module } from '@nestjs/common';
import { DocumentRepository } from './persistence/repositories/document.repository';
import { UploadDocumentUseCase } from './application/use-cases/upload-document.use-case';
import { GetDocumentsUseCase } from './application/use-cases/get-documents.use-case';
import { DocumentController } from './presentation/document.controller';
import { DOCUMENT_REPOSITORY } from './domain/repositories/document.repository.interface';
import { FILE_STORAGE_REPOSITORY } from './domain/repositories/file-storage.repository.interface';
import { FileStorageRepository } from './persistence/repositories/file-storage.repository';

@Module({
  controllers: [DocumentController],
  providers: [
    { provide: DOCUMENT_REPOSITORY, useClass: DocumentRepository },
    { provide: FILE_STORAGE_REPOSITORY, useClass: FileStorageRepository },
    UploadDocumentUseCase,
    GetDocumentsUseCase,
  ],
})
export class DocumentModule {}
