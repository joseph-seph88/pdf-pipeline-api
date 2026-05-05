import { registerAs } from '@nestjs/config';

export default registerAs('s3', () => ({
  region: process.env.AWS_REGION || 'ap-northeast-2',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  s3BucketName: process.env.AWS_S3_BUCKET_NAME,
}));
