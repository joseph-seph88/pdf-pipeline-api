export interface CreateAuthUserParams {
  email: string;
  hashedPassword: string;
  name: string;
  nickname?: string;
  agreedToTerms: boolean;
  agreedToPrivacyPolicy: boolean;
}
