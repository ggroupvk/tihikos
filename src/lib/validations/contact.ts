import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(200),
  email: z.string().email('Invalid email address'),
  subject: z.string().max(300).optional().default(''),
  message: z.string().min(10, 'Message must be at least 10 characters').max(5000),
  gdpr_consent: z.literal(true, {
    errorMap: () => ({ message: 'You must consent to data processing' }),
  }),
  recaptcha_token: z.string().min(1, 'reCAPTCHA verification required'),
});

export type ContactInput = z.infer<typeof contactSchema>;
