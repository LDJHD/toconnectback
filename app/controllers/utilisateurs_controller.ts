
import Utilisateur from '#models/utilisateur'
import Verification from '#models/verification'
import { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon'
import { randomInt } from 'crypto'
import { UtilisateurCreateValidator, UtilisateurUpdateValidator } from '../validators/utilisateur.js'
import { sendEmail } from '../services/mail_service.js'

export default class UtilisateursController {
  // Générer et envoyer un code de vérification
  async requestVerificationCode({ request, response }: HttpContext) {
    const { email } = request.only(['email'])

    // Vérifier si l'utilisateur existe
    let utilisateur = await Utilisateur.findBy('email', email)
    
    if (!utilisateur) {
      // S'il n'existe pas, on le crée avec des valeurs par défaut
      utilisateur = await Utilisateur.create({
        email: email,
        nom: 'Non défini',
        telephone: 'Non défini',
      })
    }

    // Générer un code unique
    const code = randomInt(100000, 999999).toString() // Ex: 456789

    // Définir l'expiration à 15 minutes
    const expireA = DateTime.now().plus({ minutes: 15 })

    // Sauvegarder le code de vérification en supprimant les anciens codes du même email
    await Verification.query().where('email', email).delete()
    await Verification.create({ email, code, expireA, utilise: false })

    // Envoyer le code par email
    await sendEmail(
      email,
      'Votre code de connexion - TO CONNECT TV',
      `
        <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; padding: 30px; background: #fff; border-radius: 12px; border: 1px solid #eee;">
          <div style="text-align: center; margin-bottom: 25px;">
            <h2 style="color: #e50914; margin: 0;">TO CONNECT TV</h2>
            <p style="color: #999; font-size: 0.9rem;">Streaming & Boutique</p>
          </div>
          <p style="color: #333; font-size: 1rem;">Bonjour,</p>
          <p style="color: #555;">Voici votre code de verification pour vous connecter :</p>
          <div style="text-align: center; margin: 25px 0;">
            <span style="display: inline-block; background: #f5f5f5; padding: 15px 35px; border-radius: 10px; font-size: 2rem; font-weight: 800; letter-spacing: 8px; color: #e50914; border: 2px dashed #e50914;">
              ${code}
            </span>
          </div>
          <p style="color: #999; font-size: 0.85rem; text-align: center;">Ce code expire dans 15 minutes.</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
          <p style="color: #bbb; font-size: 0.75rem; text-align: center;">Si vous n'avez pas demande ce code, ignorez cet email.</p>
        </div>
      `
    )
    console.log(`Code envoyé à ${email}: ${code}`)

    return response.ok({
      message: 'Un code de vérification a été envoyé.',
      expireA
    })
  }

  async index({ response }: HttpContext) {
    const utilisateurs = await Utilisateur.all()
    return response.ok(utilisateurs)
  }

  // Création d'un utilisateur avec validation
  async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(UtilisateurCreateValidator)
    const utilisateur = await Utilisateur.create(payload)

    return response.created({
      message: 'Utilisateur créé avec succès.',
      data: utilisateur,
    })
  }

  // Récupérer un utilisateur spécifique
  async show({ params, response }: HttpContext) {
    const utilisateur = await Utilisateur.findOrFail(params.id)
    return response.ok(utilisateur)
  }

  // Mise à jour d'un utilisateur avec validation
  async update({ params, request, response }: HttpContext) {
    const utilisateur = await Utilisateur.findOrFail(params.id)
    const payload = await request.validateUsing(UtilisateurUpdateValidator)

    utilisateur.merge(payload)
    await utilisateur.save()

    return response.ok({
      message: 'Utilisateur mis à jour avec succès.',
      data: utilisateur,
    })
  }

  // Suppression d'un utilisateur
  async destroy({ params, response }: HttpContext) {
    const utilisateur = await Utilisateur.findOrFail(params.id)
    await utilisateur.delete()

    return response.ok({ message: 'Utilisateur supprimé avec succès' })
  }
}
