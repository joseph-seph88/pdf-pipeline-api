export class DocumentEntity {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly originalName: string,
    public readonly fileName: string,
    public readonly s3Key: string,
    public readonly s3Url: string,
    public readonly fileSize: number,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
    public readonly deletedAt: Date | null,
  ) {}
}
