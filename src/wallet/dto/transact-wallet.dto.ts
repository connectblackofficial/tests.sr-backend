import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class WalletDTO {
  @IsString()
  @IsNotEmpty()
  walletName: string;

  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsNumber()
  @IsNotEmpty()
  ballance: number;
}
