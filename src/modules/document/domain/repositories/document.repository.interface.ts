import { DocumentEntity } from '../entities/document.entity';
import { CreateDocumentParams } from '../types/document.types';

export const DOCUMENT_REPOSITORY = 'DOCUMENT_REPOSITORY';

export type { CreateDocumentParams };

export interface IDocumentRepository {
  create(params: CreateDocumentParams): Promise<DocumentEntity>;
  findAllByUserId(userId: string): Promise<DocumentEntity[]>;
  findById(id: string): Promise<DocumentEntity | null>;
}
