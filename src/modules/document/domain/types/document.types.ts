export interface CreateDocumentParams {
  userId: string;
  originalName: string;
  fileName: string;
  s3Key: string;
  fileSize: number;
}
