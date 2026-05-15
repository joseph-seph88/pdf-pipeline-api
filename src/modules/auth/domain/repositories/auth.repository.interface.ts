export const AUTH_REPOSITORY = 'AUTH_REPOSITORY';

export interface CreateAuthUserParams {
  email: string;
  hashedPassword: string;
  name: string;
  nickname?: string;
  agreedToTerms: boolean;
  agreedToPrivacyPolicy: boolean;
}

export interface IAuthRepository {
  findByEmail(email: string): Promise<{
    id: string;
    email: string;
    password: string;
    deletedAt: Date | null;
  } | null>;
  create(params: CreateAuthUserParams): Promise<void>;
}
