import { Body, Controller, Get, Post } from '@nestjs/common';

import { CreateAccountDto } from './dto/create-account.dto';
import { AccountService } from './account.service';

@Controller('accounts')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Get('')
  async findAll() {
    return await this.accountService.listAccounts({});
  }

  @Post('')
  async create(@Body() createAccountDto: CreateAccountDto) {
    return await this.accountService.createAccount(createAccountDto);
  }
}
