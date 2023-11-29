import {
  Controller,
  Post,
  Body,
  Param,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { transactionOperationTypes } from 'src/utils';
import { WalletDTO } from './dto/transact-wallet.dto';
import { WalletService } from './wallet.service';

@Controller('api/wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Post(':operation')
  transact(
    @Param('operation') operation: transactionOperationTypes,
    @Body() walletDTO: WalletDTO,
  ) {
    return this.walletService.transact(walletDTO, operation);
  }
}
