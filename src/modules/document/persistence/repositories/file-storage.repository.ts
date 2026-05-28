import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { randomUUID } from 'crypto';
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import {
  IFileStorageRepository,
  UploadResult,
} from '../../domain/repositories/file-storage.repository.interface';

@Injectable()
export class FileStorageRepository implements IFileStorageRepository {
  private readonly client: S3Client;
  private readonly bucket: string;
  private readonly region: string;

  constructor(private readonly configService: ConfigService) {
    this.region = this.configService.getOrThrow<string>('s3.region');
    this.client = new S3Client({
      region: this.region,
      credentials: {
        accessKeyId: this.configService.getOrThrow<string>('s3.accessKeyId'),
        secretAccessKey:
          this.configService.getOrThrow<string>('s3.secretAccessKey'),
      },
    });
    this.bucket = this.configService.getOrThrow<string>('s3.s3BucketName');
  }

  async upload(
    buffer: Buffer,
    userId: string,
    mimeType: string,
  ): Promise<UploadResult> {
    const fileName = `${randomUUID()}.pdf`;
    const key = `documents/${userId}/${fileName}`;

    await this.client.send(
      new PutObjectCommand({
        Bucket: this.bucket,
        Key: key,
        Body: buffer,
        ContentType: mimeType,
      }),
    );

    const url = `https://${this.bucket}.s3.${this.region}.amazonaws.com/${key}`;
    return { url, key, fileName };
  }

  async uploadImage(
    buffer: Buffer,
    userId: string,
    mimeType: string,
  ): Promise<UploadResult> {
    const ext = mimeType.split('/')[1]?.replace('jpeg', 'jpg') ?? 'jpg';
    const fileName = `${randomUUID()}.${ext}`;
    const key = `profiles/${userId}/${fileName}`;

    await this.client.send(
      new PutObjectCommand({
        Bucket: this.bucket,
        Key: key,
        Body: buffer,
        ContentType: mimeType,
      }),
    );

    const url = `https://${this.bucket}.s3.${this.region}.amazonaws.com/${key}`;
    return { url, key, fileName };
  }

  async delete(key: string): Promise<void> {
    await this.client.send(
      new DeleteObjectCommand({ Bucket: this.bucket, Key: key }),
    );
  }

  async getPresignedUrl(key: string, expiresIn = 3600): Promise<string> {
    return getSignedUrl(
      this.client,
      new GetObjectCommand({ Bucket: this.bucket, Key: key }),
      { expiresIn },
    );
  }
}
