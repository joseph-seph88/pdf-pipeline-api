import { ApiProperty } from '@nestjs/swagger';
import { DocumentEntity } from '../../domain/entities/document.entity';

export class DocumentResponseDto {
  @ApiProperty({ example: 'uuid-string', description: '문서 ID' })
  id: string;

  @ApiProperty({ example: 'report.pdf', description: '원본 파일명' })
  originalName: string;

  @ApiProperty({ example: 204800, description: '파일 크기 (bytes)' })
  fileSize: number;

  @ApiProperty({
    example: 'https://bucket.s3.amazonaws.com/...?X-Amz-Signature=...',
    description: 'S3 다운로드 URL (presigned, 1시간 유효)',
  })
  downloadUrl: string;

  @ApiProperty({
    example: '2024-01-01T00:00:00.000Z',
    description: '업로드 일시',
  })
  createdAt: Date;

  static fromEntity(
    entity: DocumentEntity,
    downloadUrl: string,
  ): DocumentResponseDto {
    const dto = new DocumentResponseDto();
    dto.id = entity.id;
    dto.originalName = entity.originalName;
    dto.fileSize = entity.fileSize;
    dto.downloadUrl = downloadUrl;
    dto.createdAt = entity.createdAt;
    return dto;
  }
}
