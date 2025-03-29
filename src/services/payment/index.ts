
import { PaymentMethod } from '@/types';
import { esewaGateway } from './esewa';
import { khaltiGateway } from './khalti';
import { connectIPSGateway } from './connectIPS';
import { cardGateway } from './card';
import { bankingGateway } from './banking';

// Factory pattern to get the appropriate payment gateway based on method
export const getPaymentGateway = (method: PaymentMethod) => {
  switch (method) {
    case 'esewa':
      return esewaGateway;
    case 'khalti':
      return khaltiGateway;
    case 'banking':
      return bankingGateway;
    case 'card':
      return cardGateway;
    case 'cod':
      return {
        processPayment: async (amount: number) => {
          // COD doesn't need payment processing, just return success
          console.log(`Processing COD payment of ${amount}`);
          return { success: true, transactionId: `COD-${Date.now()}` };
        }
      };
    default:
      throw new Error(`Payment method ${method} not supported`);
  }
};

export type PaymentResponse = {
  success: boolean;
  transactionId?: string;
  error?: string;
};

export interface PaymentGateway {
  processPayment: (amount: number, metadata?: Record<string, any>) => Promise<PaymentResponse>;
}
