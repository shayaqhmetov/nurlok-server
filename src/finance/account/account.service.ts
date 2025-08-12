import { Inject, Injectable } from '@nestjs/common';
import { Prisma, Account } from 'prisma/generated/prisma';
import { PrismaService } from '../../prisma/prisma.service';
import { CurrencyService } from '../currency/currency.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { Errors } from '../errors';

@Injectable()
export class AccountService {
  constructor(
    @Inject(PrismaService) private prisma: PrismaService,
    protected readonly currencyService: CurrencyService,
  ) {}

  async createAccount(createAccountDto: CreateAccountDto): Promise<Account> {
    const currency = await this.currencyService.findCurrencyByCode(
      createAccountDto.currencyCode,
    );

    if (!currency)
      throw Errors.NOT_FOUND('Currency', createAccountDto.currencyCode);

    return this.prisma.account.create({
      data: {
        name: createAccountDto.name,
        userId: createAccountDto.userId,
        currency: {
          connect: { id: currency.id },
        },
      },
    });
  }

  async listAccounts(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.AccountWhereUniqueInput;
    where?: Prisma.AccountWhereInput;
    orderBy?: Prisma.AccountOrderByWithRelationInput;
  }): Promise<Account[] | null> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.account.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async updateAccount(params: {
    where: Prisma.AccountWhereUniqueInput;
    data: Prisma.AccountUpdateInput;
  }): Promise<Account> {
    const { where, data } = params;
    return this.prisma.account.update({
      data,
      where,
    });
  }

  async deleteAccount(where: Prisma.AccountWhereUniqueInput): Promise<Account> {
    return this.prisma.account.delete({
      where,
    });
  }
}
