import vine from '@vinejs/vine'

export const CompteCreateValidator = vine.compile(
  vine.object({
    emailCompte: vine.string().email(), // Validation de l'email
    motDePasse: vine.string(), // Mot de passe avec un minimum de 6 caractères
    plateforme: vine.string(), // Plateforme doit être une chaîne de caractère de minimum 3 caractères
    nbUtilisateurs: vine.number().positive(), // Le nombre d'utilisateurs doit être positif
    dateExpiration: vine.date(), // La date d'expiration doit être une date valide
  })
)

export const CompteUpdateValidator = vine.compile(
  vine.object({
    emailCompte: vine.string().email().optional(), // L'email est optionnel lors de la mise à jour
    motDePasse: vine.string().optional(), // Mot de passe est optionnel, mais doit avoir un minimum de 6 caractères s'il est présent
    plateforme: vine.string().optional(), // La plateforme est optionnelle, mais doit être valide si présente
    nbUtilisateurs: vine.number().positive().optional(), // Le nombre d'utilisateurs est optionnel mais doit être positif s'il est présent
    dateExpiration: vine.date().optional(), // La date d'expiration est optionnelle
  })
)
