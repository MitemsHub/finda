export interface EmailProvider {
  sendEmail(to: string, subject: string, body: string): Promise<{ success: boolean }>;
}

// Placeholder for SendGrid/Resend implementation
export class EmailService implements EmailProvider {
  async sendEmail(to: string, subject: string, body: string) {
    // Implementation would go here
    console.log('Sending email', { to, subject, bodyLength: body.length });
    return { success: true };
  }
}

export const emailService = new EmailService();
