import vine from '@vinejs/vine'

export const ProfilCreateValidator = vine.compile(
  vine.object({
    nomProfil: vine.string(), // Le nom du profil doit être une chaîne entre 3 et 255 caractères
    pin: vine.string(), // Le pin doit être une chaîne de 4 caractères
    nbAbonnes: vine.number().positive(), // Le nombre d'abonnés doit être un nombre positif
    compteId: vine.number().positive(), // Le compteId doit être un nombre positif (correspondant à un ID existant dans le modèle Compte)
  })
)

export const ProfilUpdateValidator = vine.compile(
  vine.object({
    nomProfil: vine.string().optional(), // Nom de profil est optionnel lors de la mise à jour
    pin: vine.string().optional(), // Pin est optionnel lors de la mise à jour
    nbAbonnes: vine.number().positive().optional(), // Nombre d'abonnés est optionnel
    compteId: vine.number().positive().optional(), // compteId est optionnel
  })
)
