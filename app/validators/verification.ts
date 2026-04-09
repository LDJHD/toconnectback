import { DateTime } from 'luxon'
import vine from '@vinejs/vine'

export const VerificationCreateValidator = vine.compile(
  vine.object({
    email: vine.string().email().trim().toLowerCase(),
    code: vine.string().minLength(6).maxLength(6).regex(/^\d{6}$/), // Code à 6 chiffres
    utilise: vine.boolean().optional(),
    expireA: vine.date().after(DateTime.now().toISO()).optional(), // Expiration après le moment actuel
  })
)

export const VerificationUpdateValidator = vine.compile(
  vine.object({
    email: vine.string().email().trim().toLowerCase().optional(),
    code: vine.string().minLength(6).maxLength(6).regex(/^\d{6}$/).optional(), // Code à 6 chiffres
    utilise: vine.boolean().optional(),
    expireA: vine.date().after(DateTime.now().toISO()).optional(), // Expiration après maintenant
  })
)
