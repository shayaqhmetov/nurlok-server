/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { CurrencyService } from './currency.service';
import { PrismaService } from '../../prisma/prisma.service';
import { mockPrisma } from './currency.mock';
import { Prisma } from '@/../prisma/generated/prisma';

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

    it('should handle pagination limit and offset', async () => {
      const result = await provider.listCurrencies({ limit: 0, offset: 1 });
      expect(Array.isArray(result)).toBe(true);
      expect(mockPrisma.currency.findMany).toHaveBeenCalledWith({
        skip: 1,
        take: undefined,
        cursor: undefined,
        orderBy: undefined,
        where: undefined,
      });
    });

    it('should return an empty array if no currencies are found', async () => {
      jest.spyOn(mockPrisma.currency, 'findMany').mockResolvedValue([]);
      const result = await provider.listCurrencies({});
      expect(Array.isArray(result)).toBe(true);
      expect(result).toEqual([]);
    });

    it('should correctly calculate orderBy', async () => {
      const result = await provider.listCurrencies({
        orderBy: 'code',
        order: 'desc',
      });
      expect(Array.isArray(result)).toBe(true);
      expect(mockPrisma.currency.findMany).toHaveBeenCalledWith({
        orderBy: {
          "code": "desc",
        },
      });
    });

    it('should use default orderBy value in case of using not allowed value as orderBy', async () => {
      const result = await provider.listCurrencies({
        orderBy: 'invalid_field' as keyof Prisma.CurrencyOrderByWithRelationInput,
        order: 'asc',
      });
      expect(Array.isArray(result)).toBe(true);
      expect(mockPrisma.currency.findMany).toHaveBeenCalledWith({
        orderBy: {
          "name": "asc",
        },
      });
    });
  });
});
