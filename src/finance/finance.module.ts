import { Module } from '@nestjs/common';

import { AccountModule } from './account/account.module';
import { AccountService } from './account/account.service';
import { CurrencyModule } from './currency/currency.module';

@Module({
  imports: [AccountModule, CurrencyModule],
  providers: [AccountService],
})
export class FinanceModule {}
