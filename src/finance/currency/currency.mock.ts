export const mockPrisma = {
  currency: {
    findMany: jest.fn().mockResolvedValue([
      { id: 1, code: 'USD', name: 'US Dollar' },
      { id: 2, code: 'EUR', name: 'Euro' },
    ]),
  },
};
export const mockCurrencyService = {
  listCurrencies: jest.fn().mockResolvedValue([
    { id: 1, code: 'USD', name: 'US Dollar' },
    { id: 2, code: 'EUR', name: 'Euro' },
  ]),
};
