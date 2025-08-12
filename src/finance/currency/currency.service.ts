import { Inject, Injectable } from '@nestjs/common';
import { Prisma, Currency } from 'prisma/generated/prisma';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCurrencyDto } from './dto/create-currency.dto';
import { Errors } from '../errors';

@Injectable()
export class CurrencyService {
  constructor(@Inject(PrismaService) private prisma: PrismaService) {}

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

  async create(createCurrencyDto: CreateCurrencyDto): Promise<Currency> {
    return await this.prisma.currency.create({
      data: {
        code: createCurrencyDto.code,
        name: createCurrencyDto.name,
        symbol: createCurrencyDto.symbol,
      },
    });
  }

  async findCurrencyByCode(code: string): Promise<Currency | null> {
    return this.prisma.currency.findFirst({
      where: { code: code },
    });
  }

  async findOne(id: string): Promise<Currency | null> {
    const currency = await this.prisma.currency.findUnique({
      where: { id: id },
    });
    if (!currency) {
      throw Errors.NOT_FOUND(id, 'Currency');
    }
    return currency;
  }

  async update(id: string, updateCurrencyDto: CreateCurrencyDto) {
    return this.prisma.currency.update({
      where: { id: id },
      data: {
        code: updateCurrencyDto.code,
        name: updateCurrencyDto.name,
        symbol: updateCurrencyDto.symbol,
      },
    });
  }

  async remove(id: string) {
    return this.prisma.currency.delete({
      where: { id: id },
    });
  }

  async partialUpdate(id: string, updateCurrencyDto: CreateCurrencyDto) {
    const existingCurrency = await this.findOne(id);
    return this.prisma.currency.update({
      where: { id: id },
      data: {
        code: updateCurrencyDto.code ?? existingCurrency?.code,
        name: updateCurrencyDto.name ?? existingCurrency?.name,
        symbol: updateCurrencyDto.symbol ?? existingCurrency?.symbol,
      },
    });
  }
}
