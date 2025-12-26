export interface PaymentProvider {
  processPayment(amount: number, currency: string, source: string): Promise<{ success: boolean; id: string }>;
  createSubscription(planId: string, customerId: string): Promise<{ success: boolean; id: string }>;
}

// Placeholder for Stripe implementation
export class StripeService implements PaymentProvider {
  async processPayment(amount: number, currency: string, source: string) {
    // Implementation would go here using 'stripe' package
    console.log('Processing payment via Stripe', { amount, currency, source });
    return { success: true, id: 'mock_tx_id' };
  }

  async createSubscription(planId: string, customerId: string) {
    console.log('Creating subscription', { planId, customerId });
    return { success: true, id: 'mock_sub_id' };
  }
}

export const paymentService = new StripeService();
