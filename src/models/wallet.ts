import * as yup from 'yup';

export interface WalletRequestBody {
  userId: string;
  balance: number;
  walletName: string;
  timestamp?: string;
}

export const walletRequestSchema = yup.object({
  body: yup.object({
    userId: yup.string().required(),
    balance: yup.number().min(0).required(),
    walletName: yup.string().required()
  })
});
