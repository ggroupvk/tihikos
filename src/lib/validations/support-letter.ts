import { z } from 'zod';

export const supportLetterSchema = z.object({
  author_name: z.string().min(2, 'Name must be at least 2 characters').max(200),
  author_title: z.string().max(200).optional().default(''),
  author_country: z.string().min(2, 'Country is required').max(100),
  author_email: z.string().email('Invalid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters').max(5000),
  gdpr_consent: z.literal(true, {
    errorMap: () => ({ message: 'You must consent to data processing' }),
  }),
  recaptcha_token: z.string().min(1, 'reCAPTCHA verification required'),
});

export type SupportLetterInput = z.infer<typeof supportLetterSchema>;
