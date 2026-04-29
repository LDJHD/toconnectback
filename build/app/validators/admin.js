import vine from '@vinejs/vine';
export const AdminCreateValidator = vine.compile(vine.object({
    email: vine.string().email(),
    motDePasse: vine.string().minLength(6),
}));
export const AdminUpdateValidator = vine.compile(vine.object({
    email: vine.string().email().optional(),
    motDePasse: vine.string().minLength(6).optional(),
}));
export const AdminLoginValidator = vine.compile(vine.object({
    email: vine.string().email(),
    motDePasse: vine.string().minLength(6),
}));
//# sourceMappingURL=admin.js.map