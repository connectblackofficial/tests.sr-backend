import * as yup from 'yup';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export interface WalletRequestBody {
  userId: string;
  balance: number;
  walletName: string;
  timestamp?: string;
  createdAt?: Date;
  syncedAt?: Date;
}

export const walletRequestSchema = yup.object({
  body: yup.object({
    userId: yup.string().required(),
    balance: yup.number().min(0).required(),
    walletName: yup.string().required()
  })
});

@Entity({ name: 'wallets' })
export class Wallet {
  @PrimaryGeneratedColumn({ unsigned: true })
  id!: number;

  @Column({
    type: 'varchar',
    length: 255,
    name: 'user_id'
  })
  userId!: string;

  @Column({
    type: 'varchar',
    length: 255,
    name: 'wallet_name'
  })
  walletName!: string;

  @Column({
    type: 'decimal',
    precision: 8,
    scale: 2
  })
  balance!: number;

  @Column()
  reference!: string;

  @Column({ name: 'created_at' })
  createdAt!: Date;

  @Column({ name: 'synced_at' })
  syncedAt!: Date;
}
