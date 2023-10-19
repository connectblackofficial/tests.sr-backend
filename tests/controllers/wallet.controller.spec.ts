import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { TypedRequest } from '../../src/utils/types.util';
import { WalletRequestBody } from '../../src/models/wallet';
import StoreBalance from '../../src/services/store.service';
import WalletController from '../../src/controllers/wallet.controller';

describe('Wallet Controller', () => {
  const mockRequest = {
    body: {
      walletName: 'TestWallet',
      userId: '12345',
      balance: 50,
    },
  } as unknown as TypedRequest<WalletRequestBody>;

  const mockResponse = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  } as unknown as Response;

  beforeAll(() => {
    StoreBalance.prototype.connect = jest.fn();
    StoreBalance.prototype.syncPreviewBalance = jest.fn().mockResolvedValue({ balance: 100 });
  });

  it('should add balance successfully', async () => {
    await WalletController.add(mockRequest as TypedRequest<WalletRequestBody>, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(StatusCodes.BAD_REQUEST);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: 'Operation successful',
      updatedBalance: 100,
    });
  });

  it('should WalletController. balance successfully', async () => {
    await WalletController.subtract(mockRequest as TypedRequest<WalletRequestBody>, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(StatusCodes.BAD_REQUEST);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: 'Operation successful',
      updatedBalance: 100,
    });
  });

  it('should handle errors', async () => {
    StoreBalance.prototype.syncPreviewBalance = jest.fn().mockRejectedValue(new Error('Insufficient funds'));

    await WalletController.add(mockRequest as TypedRequest<WalletRequestBody>, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(StatusCodes.BAD_REQUEST);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: 'Insufficient funds',
    });
  });
});