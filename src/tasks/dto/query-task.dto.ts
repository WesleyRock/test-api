import { IsEnum, IsOptional, IsString } from 'class-validator';
import { Priority, Status } from '@prisma/client';

export class QueryTaskDto {
  @IsOptional()
  @IsEnum(Status)
  status?: Status;

  @IsOptional()
  @IsEnum(Priority)
  priority?: Priority;

  @IsOptional()
  @IsString()
  categoryId?: string;

  @IsOptional()
  @IsString()
  search?: string;
}
