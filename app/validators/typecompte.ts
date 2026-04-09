import vine from '@vinejs/vine'

export const TypeCompteCreateValidator = vine.compile(
  vine.object({
    nom: vine.string(), // Le nom doit être une chaîne de caractères avec un minimum de 3 caractères
    prix: vine.number().positive(), // Le prix doit être un nombre positif
    nombreEcran: vine.number().positive(), // Le nombre d'écrans doit être positif
    plateforme: vine.string(), // La plateforme doit être une chaîne de caractères avec un minimum de 3 caractères
    image: vine.any().nullable(), // L'image est optionnelle et peut être null
    description: vine.string().optional().nullable(), // La description est optionnelle et peut être null
    composition: vine.string().optional().nullable(),
  })
)

export const TypeCompteUpdateValidator = vine.compile(
  vine.object({
    nom: vine.string().optional(),
    prix: vine.number().optional(),
    nombreEcran: vine.number().optional(),
    plateforme: vine.string().optional(),
    image: vine.any().nullable(),
    description: vine.string().optional().nullable(),
    composition: vine.string().optional().nullable(),
  })
)
