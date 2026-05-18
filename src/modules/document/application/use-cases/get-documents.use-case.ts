import { Inject, Injectable } from '@nestjs/common';
import { DOCUMENT_REPOSITORY } from '../../domain/repositories/document.repository.interface';
import type { IDocumentRepository } from '../../domain/repositories/document.repository.interface';
import { DocumentEntity } from '../../domain/entities/document.entity';

@Injectable()
export class GetDocumentsUseCase {
  constructor(
    @Inject(DOCUMENT_REPOSITORY)
    private readonly documentRepository: IDocumentRepository,
  ) {}

  async execute(userId: string): Promise<DocumentEntity[]> {
    return this.documentRepository.findAllByUserId(userId);
  }
}
