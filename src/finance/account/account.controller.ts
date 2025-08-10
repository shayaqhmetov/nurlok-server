import { Body, Controller, Get, NotFoundException, Post } from '@nestjs/common';

import { CreateAccountDto } from './dto/create-account.dto';
import { AccountService } from './account.service';
import { CurrencyService } from '../currency/currency.service';

@Controller('accounts')
export class AccountController {
  constructor(
    private readonly accountService: AccountService,
    private readonly currencyService: CurrencyService,
  ) { }

  @Get('')
  async findAll() {
    return await this.accountService.listAccounts({});
  }

  @Post('')
  async create(@Body() createAccountDto: CreateAccountDto) {
    const currency = await this.currencyService.findCurrencyByCode(
      createAccountDto.currencyCode,
    );
    if (!currency) {
      throw new NotFoundException(
        `Currency with code ${createAccountDto.currencyCode} not found`
      );
    }
    return await this.accountService.createAccount({
      name: createAccountDto.name,
      userId: createAccountDto.userId,
      currency: {
        connect: { id: currency.id },
      },
    });
  }
}
