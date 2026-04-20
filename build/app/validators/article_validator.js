import vine from '@vinejs/vine';
export const createArticleValidator = vine.compile(vine.object({
    nom: vine.string().trim().minLength(2).maxLength(255),
    description: vine.string().trim().optional().nullable(),
    prix: vine.number().positive(),
    prixPromo: vine.number().positive().optional().nullable(),
    categoryId: vine.number().positive(),
    sousCategoryId: vine.number().positive().optional().nullable(),
    stock: vine.number().min(0),
    enVedette: vine.boolean().optional(),
}));
export const updateArticleValidator = vine.compile(vine.object({
    nom: vine.string().trim().minLength(2).maxLength(255).optional(),
    description: vine.string().trim().optional().nullable(),
    prix: vine.number().positive().optional(),
    prixPromo: vine.number().positive().optional().nullable(),
    categoryId: vine.number().positive().optional(),
    sousCategoryId: vine.number().positive().optional().nullable(),
    stock: vine.number().min(0).optional(),
    actif: vine.boolean().optional(),
    enVedette: vine.boolean().optional(),
}));
//# sourceMappingURL=article_validator.js.map