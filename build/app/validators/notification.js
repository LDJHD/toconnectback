import vine from '@vinejs/vine';
export const NotificationCreateValidator = vine.compile(vine.object({
    message: vine.string(),
    lue: vine.boolean(),
    tous: vine.boolean(),
    adminId: vine.number().optional(),
    utilisateurId: vine.number().optional(),
    abonnementId: vine.number().optional(),
}));
export const NotificationUpdateValidator = vine.compile(vine.object({
    message: vine.string().optional(),
    lue: vine.boolean().optional(),
    tous: vine.boolean().optional(),
    adminId: vine.number().optional(),
    utilisateurId: vine.number().optional(),
    abonnementId: vine.number().optional(),
}));
//# sourceMappingURL=notification.js.map