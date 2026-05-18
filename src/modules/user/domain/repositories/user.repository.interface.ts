import { UserEntity } from '../entities/user.entity';
import { UpdateUserParams } from '../types/user.types';

export const USER_REPOSITORY = 'USER_REPOSITORY';

export type { UpdateUserParams };

export interface IUserRepository {
  findById(id: string): Promise<UserEntity | null>;
  findByEmail(email: string): Promise<UserEntity | null>;
  update(id: string, params: UpdateUserParams): Promise<UserEntity>;
  softDelete(id: string): Promise<void>;
}
