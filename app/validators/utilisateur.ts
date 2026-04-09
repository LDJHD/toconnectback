import vine from '@vinejs/vine'

export const UtilisateurCreateValidator = vine.compile(
  vine.object({
    nom: vine.string().trim().minLength(3).maxLength(50),
    email: vine.string().email(),
    telephone: vine.string(),
  })
)

export const UtilisateurUpdateValidator = vine.compile(
  vine.object({
    nom: vine.string().trim().minLength(3).maxLength(50).optional(),
    email: vine.string().email().optional(),
    telephone: vine.string().optional(),
  })
)
