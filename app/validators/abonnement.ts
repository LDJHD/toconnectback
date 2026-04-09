import vine from '@vinejs/vine'

export const AbonnementCreateValidator = vine.compile(
  vine.object({
    // Données de l'utilisateur
    nom: vine.string(),
    email: vine.string().email(),
    telephone: vine.string(),
    id:vine.number().optional(),
    // Données de l'abonnement
    montant: vine.number().min(1000),
    prix: vine.number().min(1000),
    plateforme: vine.string(),
    composition: vine.string().optional(),
    duree: vine.number().min(1),
    typeCompteId: vine.number().min(1),
    nbEcran: vine.number().min(1)
  })
)

export const AbonnementUpdateValidator = vine.compile(
  vine.object({
    // Données de l'utilisateur
    nom: vine.string().optional(),
    email: vine.string().email().optional(),
    telephone: vine.string().optional(),
    
    // Données de l'abonnement
    montant: vine.number().min(1000).optional(),
    prix: vine.number().min(1000).optional(),
    plateforme: vine.string().optional(),
    composition: vine.string().optional(),
    duree: vine.number().min(1).optional(),
    typeCompteId: vine.number().min(1).optional(),
    nbEcran: vine.number().min(1).optional()
  })
)
