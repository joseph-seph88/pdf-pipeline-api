import { Module } from '@nestjs/common';
import { UserRepository } from './persistence/repositories/user.repository';
import { GetUserUseCase } from './application/use-cases/get-user.use-case';
import { UpdateUserUseCase } from './application/use-cases/update-user.use-case';
import { DeleteUserUseCase } from './application/use-cases/delete-user.use-case';
import { UserController } from './presentation/user.controller';
import { USER_REPOSITORY } from './domain/repositories/user.repository.interface';

@Module({
  controllers: [UserController],
  providers: [
    { provide: USER_REPOSITORY, useClass: UserRepository },
    GetUserUseCase,
    UpdateUserUseCase,
    DeleteUserUseCase,
  ],
})
export class UserModule {}
