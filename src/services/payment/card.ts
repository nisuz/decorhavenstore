
import { PaymentGateway, PaymentResponse } from './index';
import { api } from '../api';

export const cardGateway: PaymentGateway = {
  processPayment: async (amount: number, metadata?: Record<string, any>): Promise<PaymentResponse> => {
    try {
      console.log(`Processing card payment of ${amount}`);
      
      // In a real implementation, this would integrate with a card payment processor
      // For now, we'll use our simulated API
      
      // Simulate API integration
      const result = await api.processPayment('card', amount);
      
      if (result) {
        return {
          success: true,
          transactionId: `CARD-${Date.now()}`
        };
      } else {
        return {
          success: false,
          error: 'Payment failed'
        };
      }
    } catch (error) {
      console.error('Card payment error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown payment error'
      };
    }
  }
};
