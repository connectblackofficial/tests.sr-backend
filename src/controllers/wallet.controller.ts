import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { WalletRequestBody } from '../models/wallet';
import { TypedRequest } from '../utils/types.util';
import { REDIS_HOST, REDIS_PORT, REDIS_PASSWORD } from '../config/env';
import StoreBalance from '../services/store.service';

/**
 * @description Process total of balance
 * @param {WalletRequestBody} payload - Express Request object
 * @param {Response} res - Express Response object
 * @returns {Promise<Response>} - Promise object of Express Response
 */
async function process(payload: WalletRequestBody, res: Response): Promise<Response> {
  try {
    const storeBalance = new StoreBalance({
      host: REDIS_HOST,
      port: REDIS_PORT,
      password: REDIS_PASSWORD
    });
    storeBalance.connect();
  
    const total = await storeBalance.syncPreviewBalance(payload, false);
    
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: 'Operation successful',
      updatedBalance: total.balance
    });
  } catch (err) {
    const error = err as unknown as Error;
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
async function subtract(req: Request, res: Response): Promise<Response> {
  const { walletName, userId, balance } = req.body;

  const payload = {
    walletName,
    userId,
    balance: balance * -1
  } as WalletRequestBody;

  return await process(payload, res);
}

export default { add, subtract };
