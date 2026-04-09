import vine from '@vinejs/vine'

export const NotificationCreateValidator = vine.compile(
  vine.object({
    message: vine.string(), // Le message doit être une chaîne de caractères non vide
    lue: vine.boolean(), // Le champ "lue" doit être un booléen
    tous: vine.boolean(), // Le champ "tous" doit être un booléen
    adminId: vine.number().optional(), // adminId est optionnel et doit être un nombre
    utilisateurId: vine.number().optional(), // utilisateurId est optionnel et doit être un nombre
    abonnementId: vine.number().optional(),
  })
)


export const NotificationUpdateValidator = vine.compile(
    vine.object({
      message: vine.string().optional(), // Le message est optionnel mais doit être une chaîne non vide s'il est présent
      lue: vine.boolean().optional(), // lue est optionnel et doit être un booléen s'il est présent
      tous: vine.boolean().optional(), // tous est optionnel et doit être un booléen s'il est présent
      adminId: vine.number().optional(), // adminId est optionnel et doit être un nombre s'il est présent
      utilisateurId: vine.number().optional(),
      abonnementId: vine.number().optional(), // utilisateurId est optionnel et doit être un nombre s'il est présent
    })
  )
