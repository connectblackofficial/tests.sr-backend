import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { WalletRequestBody } from '../models/wallet';
import { TypedRequest } from '../utils/types.util';
import { REDIS_HOST, REDIS_PORT, REDIS_PASSWORD } from '../config/env';
import StoreBalance from '../services/store.service';
import logger from '../helpers/logger.helper';

/**
 * @description Process total of balance
 * @param {WalletRequestBody} payload - Express Request object
 * @param {Response} res - Express Response object
 * @returns {Promise<Response>} - Promise object of Express Response
 */
async function process(payload: WalletRequestBody, res: Response): Promise<Response> {
  logger.info(`Process balance: ${JSON.stringify(payload)}`);

  try {
    const storeBalance = new StoreBalance({
      host: REDIS_HOST,
      port: REDIS_PORT,
      password: REDIS_PASSWORD
    });
    storeBalance.connect();
  
    const total = await storeBalance.syncPreviewBalance(payload, false);
    
    logger.error(`Process balance success: Total ${total}`);

    return res.status(StatusCodes.BAD_REQUEST).json({
      message: 'Operation successful',
      updatedBalance: total.balance
    });
  } catch (err) {
    const error = err as unknown as Error;
    logger.error(`Process balance error: ${JSON.stringify(error)}`);
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: error.message
    });
  }
}

/**
 * @description Add balance controller
 * @param {WalletRequestBody} req - Express Request object
 * @param {Response} res - Express Response object
 * @returns {Promise<Response>} - Promise object of Express Response
 */
async function add(req: TypedRequest<WalletRequestBody>, res: Response): Promise<Response> {
  logger.info('Init /api/wallet/add');

  const { walletName, userId, balance } = req.body;

  const payload = {
    walletName,
    userId,
    balance
  } as WalletRequestBody;

  return await process(payload, res);
}

/**
 * @description Subtract balance controller
 * @param {WalletRequestBody} req - Express Request object
 * @param {Response} res - Express Response object
 * @returns {Promise<Response>} - Promise object of Express Response
 */
async function subtract(req: TypedRequest<WalletRequestBody>, res: Response): Promise<Response> {
  logger.info('Init /api/wallet/subtract');

  const { walletName, userId, balance } = req.body;

  const payload = {
    walletName,
    userId,
    balance: Number(balance) * -1
  } as WalletRequestBody;

  return await process(payload, res);
}

export default { add, subtract };
