import vine from '@vinejs/vine'

export const createPackValidator = vine.compile(
  vine.object({
    nom: vine.string().trim().minLength(2).maxLength(255),
    description: vine.string().trim().optional().nullable(),
    sessionId: vine.string().trim().optional(),
    items: vine.array(
      vine.object({
        articleId: vine.number().positive(),
        quantite: vine.number().min(1),
      })
    ).minLength(1),
  })
)

export const addPackItemValidator = vine.compile(
  vine.object({
    packId: vine.number().positive(),
    articleId: vine.number().positive(),
    quantite: vine.number().min(1),
  })
)
