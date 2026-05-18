import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { AuthModule } from '../modules/auth/auth.module';
import { HealthModule } from '../modules/health/health.module';
import { UserModule } from '../modules/user/user.module';
import { DocumentModule } from '../modules/document/document.module';
import { PrismaModule } from '../infrastructure/prisma/prisma.module';
import jwtConfig from '../config/jwt.config';
import rdsConfig from '../config/rds_config';
import s3Config from '../config/s3.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [jwtConfig, rdsConfig, s3Config],
    }),
    ThrottlerModule.forRoot([{ ttl: 60_000, limit: 30 }]),
    PrismaModule,
    AuthModule,
    HealthModule,
    UserModule,
    DocumentModule,
  ],
  controllers: [],
  providers: [{ provide: APP_GUARD, useClass: ThrottlerGuard }],
})
export class AppModule {}
