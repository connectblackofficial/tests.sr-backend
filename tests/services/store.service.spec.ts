import { WalletRequestBody } from '../../src/models/wallet';
import StoreBalance from '../../src/services/store.service';

jest.mock('redis', () => {
  return {
    createClient: jest.fn(),
  };
});

describe('StoreBalance', () => {
  let storeBalance: StoreBalance;

  beforeAll(() => {
    const redisConfig = {
      password: 'pass',
      host: 'host',
      port: 6379,
    };

    storeBalance = new StoreBalance(redisConfig);

    return storeBalance.connect();
  });

  it('should generate a unique key for the user\'s wallet', () => {
    const payload: WalletRequestBody = {
      walletName: 'MyWallet',
      userId: '12345',
      balance: 0,
    };
    const key = storeBalance.getKeyByUser(payload);
    expect(key).toMatch(/^\w+:\d+$/);
  });
});