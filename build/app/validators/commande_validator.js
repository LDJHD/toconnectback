import vine from '@vinejs/vine';
export const createCommandeValidator = vine.compile(vine.object({
    utilisateurNom: vine.string().trim().minLength(2).maxLength(255),
    utilisateurEmail: vine.string().trim().email(),
    utilisateurTelephone: vine.string().trim().minLength(8),
    notes: vine.string().trim().optional().nullable(),
    adresseLivraison: vine.string().trim().optional().nullable(),
    sessionId: vine.string().trim(),
}));
export const updateCommandeStatutValidator = vine.compile(vine.object({
    statut: vine.enum(['en_attente', 'confirmee', 'en_preparation', 'livree', 'annulee']),
}));
//# sourceMappingURL=commande_validator.js.map