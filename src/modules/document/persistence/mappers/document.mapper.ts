import { Prisma } from '@prisma/client';
import { DocumentEntity } from '../../domain/entities/document.entity';

const DOCUMENT_SELECT = {
  id: true,
  userId: true,
  originalName: true,
  fileName: true,
  s3Key: true,
  fileSize: true,
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
} as const;

export type DocumentRecord = Prisma.DocumentGetPayload<{
  select: typeof DOCUMENT_SELECT;
}>;

export { DOCUMENT_SELECT };

export class DocumentMapper {
  static toEntity(record: DocumentRecord): DocumentEntity {
    return new DocumentEntity(
      record.id,
      record.userId,
      record.originalName,
      record.fileName,
      record.s3Key,
      record.fileSize,
      record.createdAt,
      record.updatedAt,
      record.deletedAt,
    );
  }
}
