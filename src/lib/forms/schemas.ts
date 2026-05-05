import { z } from 'zod';

/**
 * Server-side validation contracts. Keep these strict — never trust
 * client input. The honeypot field `_hp` MUST be empty (real users
 * never see/fill it; bots auto-fill all fields).
 */

const localeSchema = z.enum(['el', 'ru', 'en']).optional();

export const petitionSubmitSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, 'Name too short')
    .max(120, 'Name too long'),
  positionTitle: z.string().trim().max(160).optional().or(z.literal('')),
  country: z.string().trim().max(80).optional().or(z.literal('')),
  email: z.string().trim().toLowerCase().email().max(254),
  message: z.string().trim().max(2000).optional().or(z.literal('')),
  locale: localeSchema,
  _hp: z.string().max(0).optional().or(z.literal('')), // honeypot
});

export type PetitionSubmit = z.infer<typeof petitionSubmitSchema>;

export const newsletterSubmitSchema = z.object({
  email: z.string().trim().toLowerCase().email().max(254),
  locale: localeSchema,
  _hp: z.string().max(0).optional().or(z.literal('')),
});

export type NewsletterSubmit = z.infer<typeof newsletterSubmitSchema>;
