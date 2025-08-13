import { Body, Controller, Param, Query } from '@nestjs/common';
import { Get, Put, Delete, Patch, Post } from '@nestjs/common/decorators/http';

import { CurrencyService } from './currency.service';
import { FindCurrencyDto } from './dto/find-currency.dto';
import { CreateCurrencyDto } from './dto/create-currency.dto';

@Controller('currencies')
export class CurrencyController {
  constructor(private readonly currencyService: CurrencyService) { }

  @Get()
  async findAll(@Query() query: FindCurrencyDto) {
    return this.currencyService.listCurrencies(query);
  }

  @Post()
  async create(@Body() createCurrencyDto: CreateCurrencyDto) {
    return this.currencyService.create(createCurrencyDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.currencyService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCurrencyDto: CreateCurrencyDto,
  ) {
    return this.currencyService.update(id, updateCurrencyDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.currencyService.remove(id);
  }

  @Patch(':id')
  async partialUpdate(
    @Param('id') id: string,
    @Body() updateCurrencyDto: CreateCurrencyDto,
  ) {
    return this.currencyService.partialUpdate(id, updateCurrencyDto);
  }
}
