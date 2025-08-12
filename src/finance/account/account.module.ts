import { Module } from '@nestjs/common';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { CurrencyService } from '../currency/currency.service';

@Module({
  controllers: [AccountController],
  providers: [CurrencyService, AccountService],
})
export class AccountModule {}
