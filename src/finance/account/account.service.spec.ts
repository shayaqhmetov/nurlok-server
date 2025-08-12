import { Test, TestingModule } from '@nestjs/testing';
import { AccountService } from './account.service';
import { PrismaService } from '../../prisma/prisma.service';
import { mockPrisma } from '../currency/currency.mock';
import { CurrencyService } from '../currency/currency.service';

describe('AccountService', () => {
  let provider: AccountService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AccountService,
        CurrencyService,
        {
          provide: PrismaService,
          useValue: mockPrisma,
        },
      ],
    }).compile();

    provider = module.get<AccountService>(AccountService);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
