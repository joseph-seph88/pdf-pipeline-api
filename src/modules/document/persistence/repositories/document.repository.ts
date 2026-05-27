import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../../../infrastructure/prisma/prisma.service';
import {
  IDocumentRepository,
  CreateDocumentParams,
} from '../../domain/repositories/document.repository.interface';
import { DocumentEntity } from '../../domain/entities/document.entity';
import { DocumentMapper, DOCUMENT_SELECT } from '../mappers/document.mapper';

@Injectable()
export class DocumentRepository implements IDocumentRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(params: CreateDocumentParams): Promise<DocumentEntity> {
    const doc = await this.prisma.document.create({
      data: params as Prisma.DocumentUncheckedCreateInput,
      select: DOCUMENT_SELECT,
    });
    return DocumentMapper.toEntity(doc);
  }

  async findAllByUserId(userId: string): Promise<DocumentEntity[]> {
    const docs = await this.prisma.document.findMany({
      where: { userId, deletedAt: null },
      select: DOCUMENT_SELECT,
      orderBy: { createdAt: 'desc' },
    });
    return docs.map((doc) => DocumentMapper.toEntity(doc));
  }

  async findById(id: string): Promise<DocumentEntity | null> {
    const doc = await this.prisma.document.findFirst({
      where: { id, deletedAt: null },
      select: DOCUMENT_SELECT,
    });
    return doc ? DocumentMapper.toEntity(doc) : null;
  }
}
