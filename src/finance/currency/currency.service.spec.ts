import { Test, TestingModule } from '@nestjs/testing';
import { CurrencyService } from './currency.service';
import { PrismaService } from '../../prisma/prisma.service';
import { mockPrisma } from './currency.mock';

describe('CurrencyService', () => {
  let provider: CurrencyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CurrencyService,
        {
          provide: PrismaService,
          useValue: mockPrisma,
        },
      ],
    }).compile();

    provider = module.get<CurrencyService>(CurrencyService);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });

  describe('listCurrencies', () => {
    it('should return an array of currencies', async () => {
      const result = await provider.listCurrencies({});
      expect(Array.isArray(result)).toBe(true);
      expect(result).toEqual([
        { id: 1, code: 'USD', name: 'US Dollar' },
        { id: 2, code: 'EUR', name: 'Euro' },
      ]);
    });
  });
});
