import { Processor, WorkerHost, OnWorkerEvent } from '@nestjs/bullmq';
import { Wallet } from '@prisma/client';
import { Job } from 'bullmq';
import { WalletRepository } from 'src/repository/wallet.repository';
import { queueNames } from 'src/utils';
/**
 * The concurrency property is used so that we can guarantee that each job/wallet
 * change will be done one at a time in order to wait for the previous one
 * to be executed before starting the next one.
 */
@Processor(queueNames.WALLET, {
  concurrency: Number(process.env.JOB_CONCURRENRY_RATE),
  connection: {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
  },
})
export class WalletProcessor extends WorkerHost {
  constructor(private readonly walletRepository: WalletRepository) {
    super();
  }

  async process(job: Job<any, any, string>): Promise<any> {
    const wallet: Wallet = job.data;
    console.log(`-- SYNC:STARTED ${wallet.name}_${wallet.userId}`);
    await this.walletRepository.transact(wallet);
    console.log(`-- SYNC:FINISHED ${wallet.name}_${wallet.userId}`);
  }

  @OnWorkerEvent('completed')
  onCompleted() {
    console.log('All wallets are synced.');
  }
}
