import { registerAs } from '@nestjs/config';

export default registerAs('jwt', () => {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error('JWT_SECRET env var is required');
  return {
    secret,
    expiresIn: process.env.JWT_EXPIRES_IN ?? '7d',
  };
});
