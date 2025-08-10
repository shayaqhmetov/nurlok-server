import { IsString } from 'class-validator';
import { Prisma } from 'prisma/generated/prisma';

export class CreateAccountDto {
  @IsString()
  name: string;

  @IsString()
  userId: string;

  @IsString()
  currencyCode: Prisma.CurrencyCreateInput['code'];
}
