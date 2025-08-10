import { Body, Controller, Get, Post, Query } from '@nestjs/common';

import { CurrencyService } from './currency.service';
import { CreateCurrencyDto } from './dto/create-currency.dto';

@Controller('currencies')
export class CurrencyController {
  constructor(private readonly currencyService: CurrencyService) {}

  @Get()
  async findAll(@Query() query: any) {
    return this.currencyService.listCurrencies(query);
  }

  @Post()
  async create(@Body() createCurrencyDto: CreateCurrencyDto) {
    return this.currencyService.create(createCurrencyDto);
  }
}
