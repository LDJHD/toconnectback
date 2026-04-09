import vine from '@vinejs/vine'

export const AdminCreateValidator = vine.compile(
  vine.object({
    email: vine.string().email(),
    motDePasse: vine.string().minLength(6),  // Minimum 6 caractères pour le mot de passe
  })
)


export const AdminUpdateValidator = vine.compile(
  vine.object({
    email: vine.string().email().optional(), // Email est optionnel lors de la mise à jour
    motDePasse: vine.string().minLength(6).optional(), // Mot de passe est optionnel mais doit avoir un minimum de 6 caractères s'il est présent
  })
)

export const AdminLoginValidator = vine.compile(
  vine.object({
    email: vine.string().email(),
    motDePasse: vine.string().minLength(6),
  })
)
