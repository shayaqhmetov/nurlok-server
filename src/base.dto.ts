import { Transform } from 'class-transformer';
import { IsIn, IsOptional } from 'class-validator';
import { Prisma } from '@/../prisma/generated/prisma';

export class BaseFindDto {
  @IsOptional()
  orderBy?: string = 'createdAt';

  @IsOptional()
  @IsIn([Prisma.SortOrder.asc, Prisma.SortOrder.desc])
  order?: Prisma.SortOrder = Prisma.SortOrder.asc;

  @IsOptional()
  @Transform(({ value }) => Number(value))
  limit?: number = 10;

  @IsOptional()
  @Transform(({ value }) => Number(value))
  offset?: number;
}
