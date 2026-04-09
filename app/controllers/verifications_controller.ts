
import Utilisateur from '#models/utilisateur'
import Verification from '#models/verification'
import { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon'
import { VerificationCreateValidator, VerificationUpdateValidator } from '#validators/verification'
import { v4 as uuidv4 } from 'uuid' // Pour générer un token unique
import AccessToken from '#models/access_token'

export default class VerificationsController {
  // Vérifier le code et connecter l'utilisateur
  // async verifyCode({ request, response }: HttpContext) {
  //   const { email, code } = request.only(['email', 'code'])

  //   // Vérifier si un code existe pour cet email
  //   const verification = await Verification
  //     .query()
  //     .where('email', email)
  //     .andWhere('code', code)
  //     .andWhere('utilise', false)
  //     .first()

  //   if (!verification) {
  //     return response.unauthorized({ error: 'Code invalide ou inexistant.' })
  //   }

  //   // Vérifier si le code est expiré
  //   if (DateTime.now() > verification.expireA) {
  //     return response.unauthorized({ error: 'Code expiré, veuillez en générer un nouveau.' })
  //   }

  //   // Marquer le code comme utilisé
  //   verification.utilise = true
  //   await verification.save()

  //   // Récupérer l'utilisateur correspondant
  //   let utilisateur = await Utilisateur.findBy('email', email)
  //   if (!utilisateur) {
  //     return response.unauthorized({ error: 'Utilisateur introuvable.' })
  //   }

  //   // Simuler une connexion (à adapter avec un token si besoin)
  //   return response.ok({ message: 'Connexion réussie.', utilisateur })
  // }

    // Vérifier le code et connecter l'utilisateur
    async verifyCode({ request, response }: HttpContext) {
      const { email, code } = request.only(['email', 'code'])
  
      // Vérifier si un code existe pour cet email
      const verification = await Verification
        .query()
        .where('email', email)
        .andWhere('code', code)
        .andWhere('utilise', false)
        .first()
  
      if (!verification) {
        return response.unauthorized({ error: 'Code invalide ou inexistant.' })
      }
  
      // Vérifier si le code est expiré
      if (DateTime.now() > verification.expireA) {
        return response.unauthorized({ error: 'Code expiré, veuillez en générer un nouveau.' })
      }
  
      // Marquer le code comme utilisé
      verification.utilise = true
      await verification.save()
  
      // Récupérer l'utilisateur correspondant
      const utilisateur = await Utilisateur.findBy('email', email)
      if (!utilisateur) {
        return response.unauthorized({ error: 'Utilisateur introuvable.' })
      }
  
      // Générer un token
      const token = uuidv4() // Générer un token unique
      const expiresAt = DateTime.now().plus({ hours: 12 }) // Token expirera dans 12 heures
  
      // Sauvegarder le token dans la table 'access_tokens'
      await AccessToken.create({
        utilisateur_id: utilisateur.id,
        token,
        type: 'Bearer', // Exemple de type de token
        expires_at: expiresAt,
      })
  
      // Répondre avec le token
      return response.ok({ message: 'Connexion réussie.', utilisateur, token })
    }
  

  async index({ response }: HttpContext) {
    const verifications = await Verification.all()
    return response.ok(verifications)
  }

  async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(VerificationCreateValidator)

    const verification = await Verification.create({
      ...payload,
      expireA: DateTime.fromJSDate(new Date(payload.expireA)), // Gestion propre des dates
    })

    return response.created(verification)
  }

  async show({ params, response }: HttpContext) {
    const verification = await Verification.findOrFail(params.id)
    return response.ok(verification)
  }

  async update({ params, request, response }: HttpContext) {
    try {
      const verification = await Verification.findOrFail(params.id)
      
      // Validation des données
      const payload = await request.validateUsing(VerificationUpdateValidator)

      // ✅ Conversion des dates JS en DateTime d'AdonisJS
      verification.merge({
        ...payload,
        expireA: payload.expireA ? DateTime.fromJSDate(new Date(payload.expireA)) : verification.expireA,
      })
      
      await verification.save()

      return response.ok({ message: 'Vérification mise à jour avec succès', data: verification })
    } catch (error) {
      return response.status(400).send({
        error: 'Erreur lors de la mise à jour de la vérification',
        details: error.messages || 'Données invalides'
      })
    }
  }

  async destroy({ params, response }: HttpContext) {
    const verification = await Verification.findOrFail(params.id)
    await verification.delete()

    return response.ok({ message: 'Vérification supprimée avec succès' })
  }
}

