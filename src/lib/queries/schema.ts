import { z } from 'zod';
import { PORTAL_IDS } from '@/config/portals';
import { normaliseReference, REFERENCE_PATTERN } from './reference';

/**
 * Server-side validation for the Citizen Service Engine.
 *
 * Spec §18/§21: "Never trust frontend validation. Every backend request must
 * validate input again." These schemas are the single definition, imported by
 * both the client form (react-hook-form resolver) and the route handler — the
 * client gets fast feedback, the server gets the actual guarantee.
 */

/** Indian mobile number. Accepts +91 / 91 / bare 10-digit starting 6-9. */
export const phoneSchema = z
  .string()
  .trim()
  .transform((v) => v.replace(/[\s()-]/g, ''))
  .refine((v) => /^(?:\+?91)?[6-9]\d{9}$/.test(v), {
    message: 'Enter a valid 10-digit Indian mobile number',
  })
  .transform((v) => `+91${v.slice(-10)}`);

export const otpSchema = z
  .string()
  .trim()
  .regex(/^\d{6}$/, { message: 'Enter the 6-digit code' });

export const requestOtpSchema = z.object({
  phone: phoneSchema,
  /** Cloudflare Turnstile token — required before any OTP is sent (spec §21). */
  turnstileToken: z.string().min(1, { message: 'Verification required' }),
});

export const verifyOtpSchema = z.object({
  phone: phoneSchema,
  code: otpSchema,
});

export const MAX_ATTACHMENT_BYTES = 10 * 1024 * 1024;

export const ALLOWED_ATTACHMENT_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'application/pdf',
] as const;

export const attachmentSchema = z.object({
  fileName: z.string().min(1).max(255),
  mimeType: z.enum(ALLOWED_ATTACHMENT_TYPES, {
    errorMap: () => ({ message: 'Only JPEG, PNG, WebP or PDF files are accepted' }),
  }),
  sizeBytes: z
    .number()
    .int()
    .positive()
    .max(MAX_ATTACHMENT_BYTES, { message: 'Each file must be 10 MB or smaller' }),
});

export const createQuerySchema = z.object({
  department: z.enum(PORTAL_IDS),
  categoryId: z.string().uuid().optional(),
  subject: z.string().trim().min(3).max(200),
  description: z.string().trim().min(10).max(5000),
  location: z.string().trim().max(300).optional(),
  attachments: z.array(attachmentSchema).max(5).default([]),
  turnstileToken: z.string().min(1),
});

/**
 * Public tracker (MLA portal §11) — works WITHOUT login, by reference plus the
 * last four digits of the mobile number used to file it. Reference alone would
 * be enumerable; requiring the full number would defeat the purpose.
 */
export const trackQuerySchema = z.object({
  reference: z
    .string()
    .transform(normaliseReference)
    .refine((v) => REFERENCE_PATTERN.test(v), { message: 'Check the reference number' }),
  phoneLast4: z.string().regex(/^\d{4}$/, { message: 'Enter the last 4 digits' }),
});

export type RequestOtpInput = z.infer<typeof requestOtpSchema>;
export type VerifyOtpInput = z.infer<typeof verifyOtpSchema>;
export type CreateQueryInput = z.infer<typeof createQuerySchema>;
export type TrackQueryInput = z.infer<typeof trackQuerySchema>;
