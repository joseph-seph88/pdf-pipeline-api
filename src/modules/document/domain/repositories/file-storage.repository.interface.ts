export const FILE_STORAGE_REPOSITORY = 'FILE_STORAGE_REPOSITORY';

export interface UploadResult {
  url: string;
  key: string;
  fileName: string;
}

export interface IFileStorageRepository {
  upload(
    buffer: Buffer,
    userId: string,
    mimeType: string,
  ): Promise<UploadResult>;
  uploadImage(
    buffer: Buffer,
    userId: string,
    mimeType: string,
  ): Promise<UploadResult>;
  delete(key: string): Promise<void>;
  getPresignedUrl(key: string, expiresIn?: number): Promise<string>;
}
