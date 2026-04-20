import vine from '@vinejs/vine';
export const TypeCompteCreateValidator = vine.compile(vine.object({
    nom: vine.string(),
    prix: vine.number().positive(),
    nombreEcran: vine.number().positive(),
    plateforme: vine.string(),
    image: vine.any().nullable(),
    description: vine.string().optional().nullable(),
    composition: vine.string().optional().nullable(),
}));
export const TypeCompteUpdateValidator = vine.compile(vine.object({
    nom: vine.string().optional(),
    prix: vine.number().optional(),
    nombreEcran: vine.number().optional(),
    plateforme: vine.string().optional(),
    image: vine.any().nullable(),
    description: vine.string().optional().nullable(),
    composition: vine.string().optional().nullable(),
}));
//# sourceMappingURL=typecompte.js.map