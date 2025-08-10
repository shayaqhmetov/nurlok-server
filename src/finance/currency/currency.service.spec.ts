import { Test, TestingModule } from '@nestjs/testing';
import { Currency } from './currency.service';

describe('Currency', () => {
  let provider: Currency;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Currency],
    }).compile();

    provider = module.get<Currency>(Currency);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
