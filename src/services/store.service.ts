import { createClient } from 'redis';
import slugify from 'slugify';
import { WalletRequestBody } from '../models/wallet';
import logger from '../helpers/logger.helper';

/**
 * Configuration for connecting to Redis.
 */
type ConnectConfig = {
  password: string;
  host: string;
  port: number;
};

/**
 * Response object for balance information.
 */
type BalanceResponse = {
  balance: number;
}

/**
 * Class to store and manage wallet balances in Redis.
 */
class StoreBalance {
  private client: ReturnType<typeof createClient>;
  private config: ConnectConfig;

  /**
   * Creates an instance of StoreBalance.
   * @param {ConnectConfig} config - The configuration for connecting to Redis.
   */
  constructor(config: ConnectConfig) {
    this.config = config;
    this.client = createClient();
  }

  /**
   * Connects to the Redis server.
   * @returns {Promise<void>} A Promise that resolves when the connection is established.
   */
  async connect(): Promise<void> {
    try {
      this.client = createClient({
        username: 'default',
        password: this.config.password,
        socket: {
          host: this.config.host,
          port: Number(this.config.port)
        }
      });

      this.client.on('error', (err: Error) => {
        logger.error(`Redis Error: ${JSON.stringify(err)}`);
      });

      await this.client.connect();
    } catch (err) {
      const error = err as unknown as Error;
      logger.error(`Redis Error: ${JSON.stringify(error)}`);
    }
  }

  /**
   * Generates a unique key for the user's wallet based on user and wallet name.
   * @param {WalletRequestBody} payload - The request body containing user and wallet information.
   * @returns {string} The generated key.
   */
  getKeyByUser(payload: WalletRequestBody): string {
    const walletNameKey = slugify(payload.walletName);
    return `${walletNameKey}:${payload.userId}`;
  }

  /**
   * Retrieves the summary balance for a user's wallet.
   * @param {WalletRequestBody} payload - The request body containing user and wallet information.
   * @returns {Promise<number | null>} A Promise that resolves to the summary balance or null if not found.
   */
  async getSummaryBalance(payload: WalletRequestBody) {
    const userKey = `summary:${this.getKeyByUser(payload)}`;
    const isExists = this.client.exists(userKey);

    if (!isExists) {
      return null;
    }

    return await this.client.get(userKey);
  }

  /**
   * Retrieves the preview balance for a user's wallet.
   * @param {WalletRequestBody} payload - The request body containing user and wallet information.
   * @returns {Promise<number>} A Promise that resolves to the preview balance.
   */
  async getPreviewBalance(payload: WalletRequestBody): Promise<number> {
    const userKey = `preview:${this.getKeyByUser(payload)}`;
    const previewList = await this.client.lRange(userKey, 0, -1);
    const summaryBalance = await this.getSummaryBalance(payload);

    const totalPreviewBalance = previewList
      .map(item => JSON.parse(item))
      .reduce((total, item) => item.balance + total, 0);

    let total = totalPreviewBalance;

    if (summaryBalance) {
      total = Number(summaryBalance) + Number(totalPreviewBalance);
    }

    return Number(total.toFixed(2));
  }

  /**
   * Synchronizes the preview balance for a user's wallet, either adding or subtracting.
   * @param {WalletRequestBody} payload - The request body containing user and wallet information.
   * @param {boolean} isSubtract - Whether to subtract the balance.
   * @returns {Promise<BalanceResponse>} A Promise that resolves to the updated balance response.
   * @throws {Error} Throws an error if the balance is insufficient.
   */
  async syncPreviewBalance(payload: WalletRequestBody, isSubtract: boolean): Promise<BalanceResponse> {
    const currentBalance = await this.getPreviewBalance(payload);
    const userKey = `preview:${this.getKeyByUser(payload)}`;

    if (isSubtract && currentBalance <= 0) {
      throw new Error('Insufficient funds');
    }

    await this.client.lPush(userKey, JSON.stringify({
      ...payload,
      timestamp: Date.now()
    }));

    const updatedBalance = await this.getPreviewBalance(payload);

    return {
      balance: updatedBalance
    };
  }
}

export default StoreBalance;