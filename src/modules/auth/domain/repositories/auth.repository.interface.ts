import { CreateAuthUserParams } from '../types/auth.types';

export const AUTH_REPOSITORY = 'AUTH_REPOSITORY';

export type { CreateAuthUserParams };

export interface IAuthRepository {
  findByEmail(email: string): Promise<{
    id: string;
    email: string;
    password: string;
    deletedAt: Date | null;
  } | null>;
  create(params: CreateAuthUserParams): Promise<void>;
}
