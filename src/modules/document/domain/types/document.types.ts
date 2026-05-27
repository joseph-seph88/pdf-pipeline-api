export interface CreateDocumentParams {
  userId: string;
  originalName: string;
  fileName: string;
  s3Key: string;
  s3Url: string;
  fileSize: number;
}
