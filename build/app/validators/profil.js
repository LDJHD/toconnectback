import vine from '@vinejs/vine';
export const ProfilCreateValidator = vine.compile(vine.object({
    nomProfil: vine.string(),
    pin: vine.string(),
    nbAbonnes: vine.number().positive(),
    compteId: vine.number().positive(),
}));
export const ProfilUpdateValidator = vine.compile(vine.object({
    nomProfil: vine.string().optional(),
    pin: vine.string().optional(),
    nbAbonnes: vine.number().positive().optional(),
    compteId: vine.number().positive().optional(),
}));
//# sourceMappingURL=profil.js.map