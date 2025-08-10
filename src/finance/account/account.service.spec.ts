import { Test, TestingModule } from '@nestjs/testing';
import { AccountService } from './account.service';

describe('Account', () => {
  let provider: AccountService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AccountService],
    }).compile();

    provider = module.get<AccountService>(AccountService);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
