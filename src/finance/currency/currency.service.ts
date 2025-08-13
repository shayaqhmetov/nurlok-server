import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma, Currency } from '@/../prisma/generated/prisma';

import { Errors } from '../errors';
import { FindCurrencyDto } from './dto/find-currency.dto';
import { CreateCurrencyDto } from './dto/create-currency.dto';

@Injectable()
export class CurrencyService {
  constructor(@Inject(PrismaService) private prisma: PrismaService) { }

  async listCurrencies(params: FindCurrencyDto) {
    const allowedOrderBy = ['code', 'name', 'symbol'];
    const { limit, offset, orderBy, order } = params;
    let orderByField = orderBy;
    if (orderBy && !allowedOrderBy.includes(orderBy as string)) {
      orderByField = 'name';
    }
    // convert orderBy to object
    return this.prisma.currency.findMany({
      skip: offset ? parseInt(offset as any, 10) : undefined,
      take: limit ? parseInt(limit as any, 10) : undefined,
      orderBy: orderByField
        ? ({
            [orderByField as any]: order,
          } as Prisma.CurrencyOrderByWithRelationInput)
        : undefined,
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
