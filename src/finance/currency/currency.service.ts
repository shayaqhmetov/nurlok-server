import { Inject, Injectable } from '@nestjs/common';
import { Prisma, Currency } from 'prisma/generated/prisma';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class CurrencyService {
  constructor(@Inject(PrismaService) private prisma: PrismaService) { }

  async listCurrencies(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.CurrencyWhereUniqueInput;
    where?: Prisma.CurrencyWhereInput;
    orderBy?: Prisma.CurrencyOrderByWithRelationInput;
  }) {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.currency.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async create(data: Prisma.CurrencyCreateInput): Promise<Currency> {
    return await this.prisma.currency.create({ data });
  }

  async findCurrencyByCode(code: string): Promise<Currency | null> {
    return this.prisma.currency.findFirst({
      where: { code: code },
    });
  }
}
