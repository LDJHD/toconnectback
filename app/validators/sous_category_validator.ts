import vine from '@vinejs/vine'

export const createSousCategoryValidator = vine.compile(
  vine.object({
    nom: vine.string().trim().minLength(2).maxLength(50),
    categoryId: vine.number().positive(),
  })
)

export const updateSousCategoryValidator = vine.compile(
  vine.object({
    nom: vine.string().trim().minLength(2).maxLength(50).optional(),
    categoryId: vine.number().positive().optional(),
  })
)
