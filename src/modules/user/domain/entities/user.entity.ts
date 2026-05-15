export class UserEntity {
  constructor(
    public readonly id: string,
    public readonly email: string,
    public readonly name: string,
    public readonly nickname: string | null,
    public readonly profileImage: string | null,
    public readonly agreedToTerms: boolean,
    public readonly agreedToPrivacyPolicy: boolean,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
    public readonly deletedAt: Date | null,
  ) {}
}
