import { UserEntity } from '../entities/user.entity';

export const USER_REPOSITORY = 'USER_REPOSITORY';

export interface UpdateUserParams {
  nickname?: string;
  profileImage?: string;
}

export interface IUserRepository {
  findById(id: string): Promise<UserEntity | null>;
  findByEmail(email: string): Promise<UserEntity | null>;
  update(id: string, params: UpdateUserParams): Promise<UserEntity>;
  softDelete(id: string): Promise<void>;
}
