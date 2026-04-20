import { DateTime } from 'luxon';
import vine from '@vinejs/vine';
export const VerificationCreateValidator = vine.compile(vine.object({
    email: vine.string().email().trim().toLowerCase(),
    code: vine.string().minLength(6).maxLength(6).regex(/^\d{6}$/),
    utilise: vine.boolean().optional(),
    expireA: vine.date().after(DateTime.now().toISO()).optional(),
}));
export const VerificationUpdateValidator = vine.compile(vine.object({
    email: vine.string().email().trim().toLowerCase().optional(),
    code: vine.string().minLength(6).maxLength(6).regex(/^\d{6}$/).optional(),
    utilise: vine.boolean().optional(),
    expireA: vine.date().after(DateTime.now().toISO()).optional(),
}));
//# sourceMappingURL=verification.js.map