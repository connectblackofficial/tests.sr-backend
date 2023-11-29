import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { WalletDTO } from '../wallet/dto/transact-wallet.dto';
import { transactionOperationTypes } from 'src/utils';

interface OperationMiddlewareParams {
  operation: transactionOperationTypes;
}

@Injectable()
export class TransactMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    // VALIDATE OBJECT
    const walletPayload = plainToClass(WalletDTO, req.body);
    const errors = await validate(walletPayload);

    if (errors.length > 0) {
      return res.status(400).json({ message: 'Dados inválidos', errors });
    }

    // VALIDATE ROUTE
    const operation: transactionOperationTypes = req.params
      .operation as transactionOperationTypes;

    if (!Object.values(transactionOperationTypes).includes(operation)) {
      return res
        .status(400)
        .json({ message: `Operation ${operation} not found.` });
    }

    next();
  }
}
