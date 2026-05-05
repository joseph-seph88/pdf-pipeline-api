import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { GetUserUseCase } from '../application/use-cases/get-user.use-case';
import { UpdateUserUseCase } from '../application/use-cases/update-user.use-case';
import { DeleteUserUseCase } from '../application/use-cases/delete-user.use-case';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { JwtAuthGuard } from '../../../shared/guards/jwt-auth.guard';
import { CurrentUser } from '../../../shared/decorators/current-user.decorator';
import type { JwtPayload } from '../../../infrastructure/jwt/jwt-payload.interface';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UserController {
  constructor(
    private readonly getUserUseCase: GetUserUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,
  ) {}

  @Get('me')
  async getMe(@CurrentUser() user: JwtPayload) {
    const entity = await this.getUserUseCase.execute(user.sub);
    return UserResponseDto.fromEntity(entity);
  }

  @Patch('me')
  async updateMe(@CurrentUser() user: JwtPayload, @Body() dto: UpdateUserDto) {
    const entity = await this.updateUserUseCase.execute({
      id: user.sub,
      ...dto,
    });
    return UserResponseDto.fromEntity(entity);
  }

  @Delete('me')
  async deleteMe(@CurrentUser() user: JwtPayload) {
    await this.deleteUserUseCase.execute(user.sub);
  }
}
