import vine from '@vinejs/vine';
export const createCategoryValidator = vine.compile(vine.object({
    nom: vine.string().trim().minLength(2).maxLength(100),
    description: vine.string().trim().optional().nullable(),
    image: vine.string().optional().nullable(),
}));
export const updateCategoryValidator = vine.compile(vine.object({
    nom: vine.string().trim().minLength(2).maxLength(100).optional(),
    description: vine.string().trim().optional().nullable(),
    image: vine.string().optional().nullable(),
    actif: vine.boolean().optional(),
}));
//# sourceMappingURL=category_validator.js.map