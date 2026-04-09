import vine from '@vinejs/vine'

export const addPanierItemValidator = vine.compile(
  vine.object({
    sessionId: vine.string().trim(),
    articleId: vine.number().positive().optional(),
    packId: vine.number().positive().optional(),
    quantite: vine.number().min(1),
  })
)

export const updatePanierItemValidator = vine.compile(
  vine.object({
    quantite: vine.number().min(1),
  })
)
