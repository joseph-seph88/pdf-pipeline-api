import { IsOptional, IsString, IsUrl, MaxLength } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @MaxLength(50)
  nickname?: string;

  @IsOptional()
  @IsUrl()
  profileImage?: string;
}
