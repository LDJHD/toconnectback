import vine from '@vinejs/vine';
export const CompteCreateValidator = vine.compile(vine.object({
    emailCompte: vine.string().email(),
    motDePasse: vine.string(),
    plateforme: vine.string(),
    nbUtilisateurs: vine.number().positive(),
    dateExpiration: vine.date(),
}));
export const CompteUpdateValidator = vine.compile(vine.object({
    emailCompte: vine.string().email().optional(),
    motDePasse: vine.string().optional(),
    plateforme: vine.string().optional(),
    nbUtilisateurs: vine.number().positive().optional(),
    dateExpiration: vine.date().optional(),
}));
//# sourceMappingURL=compte.js.map