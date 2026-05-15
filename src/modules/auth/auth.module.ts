import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigType } from '@nestjs/config';
import type { StringValue } from 'ms';
import jwtConfig from '../../config/jwt.config';
import { AuthRepository } from './persistence/repositories/auth.repository';
import { LoginUseCase } from './application/use-cases/login.use-case';
import { SignUpUseCase } from './application/use-cases/sign-up.use-case';
import { AuthController } from './presentation/auth.controller';
import { AUTH_REPOSITORY } from './domain/repositories/auth.repository.interface';
import { JwtStrategy } from '../../infrastructure/jwt/jwt.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      inject: [jwtConfig.KEY],
      useFactory: (config: ConfigType<typeof jwtConfig>) => ({
        secret: config.secret,
        signOptions: { expiresIn: config.expiresIn as StringValue },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    { provide: AUTH_REPOSITORY, useClass: AuthRepository },
    LoginUseCase,
    SignUpUseCase,
    JwtStrategy,
  ],
})
export class AuthModule {}
