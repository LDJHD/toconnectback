import { HttpContext } from '@adonisjs/core/http'
import Admin from '#models/admin'
import Verification from '#models/verification'
import { DateTime } from 'luxon'
import { v4 as uuidv4 } from 'uuid'
import { randomInt } from 'crypto'
import { AdminCreateValidator, AdminLoginValidator, AdminUpdateValidator } from '#validators/admin'
import hash from '@adonisjs/core/services/hash'
import AccessToken from '#models/access_token'
import { sendEmail } from '../services/mail_service.js'


export default class AdminsController {
  
  // Lister tous les administrateurs
  async index({ response }: HttpContext) {
    const admins = await Admin.all()
    return response.ok(admins)
  }

  // Créer un nouvel administrateur
  async store({ request, response }: HttpContext) {
    try {
      // Validation des données
      const data = await request.validateUsing(AdminCreateValidator)

      // Hachage du mot de passe
      data.motDePasse = await hash.make(data.motDePasse)

      // Création de l'administrateur
      const admin = await Admin.create(data)
      return response.created(admin)
    } catch (error) {
      return response.status(400).send({
        error: 'Erreur lors de la création de l\'administrateur',
        details: error.messages || 'Données invalides',
      })
    }
  }

  // Afficher un administrateur spécifique
  async show({ params, response }: HttpContext) {
    try {
      const admin = await Admin.findOrFail(params.id)
      return response.ok(admin)
    } catch (error) {
      return response.status(404).send({
        error: 'Administrateur non trouvé',
        details: error.message,
      })
    }
  }

  // Mettre à jour un administrateur spécifique
  async update({ params, request, response }: HttpContext) {
    try {
      const admin = await Admin.findOrFail(params.id)
      
      // Validation des données
      const data = await request.validateUsing(AdminUpdateValidator)

      // Si le mot de passe est inclus, on le hache
      if (data.motDePasse) {
        data.motDePasse = await hash.make(data.motDePasse)
      }

      // Mise à jour de l'administrateur
      admin.merge(data)
      await admin.save()

      return response.ok(admin)
    } catch (error) {
      return response.status(400).send({
        error: 'Erreur lors de la mise à jour de l\'administrateur',
        details: error.messages || 'Données invalides',
      })
    }
  }

  async login({ request, response }: HttpContext) {
    try {
      // Validation des données entrantes
      const { email, motDePasse } = await request.validateUsing(AdminLoginValidator)

      // Vérifier si l'admin existe
      const admin = await Admin.findBy('email', email)
      if (!admin) {
        return response.unauthorized({ error: 'Identifiants invalides.' })
      }

      // Vérifier le mot de passe
      const passwordValid = await hash.verify(admin.motDePasse, motDePasse)
      if (!passwordValid) {
        return response.unauthorized({ error: 'Identifiants invalides.' })
      }

      // Générer un token unique
      const token = uuidv4()
      const expiresAt = DateTime.now().plus({ hours: 12 }) // Expiration dans 12 heures

      // Sauvegarde du token dans la table 'access_tokens'
      await AccessToken.create({
        admin_id: admin.id, // Remplace utilisateur_id par admin_id
        token,
        type: 'Bearer',
        expires_at: expiresAt,
      })

      // Répondre avec le token et l'admin
      return response.ok({
        message: 'Connexion réussie.',
        admin,
        token,
      })
    } catch (error) {
      return response.badRequest({
        error: 'Erreur lors de la connexion.',
        details: error.messages || 'Données invalides',
      })
    }
  }

  // Mot de passe oublie - envoyer code de verification
  async forgotPassword({ request, response }: HttpContext) {
    const { email } = request.only(['email'])

    const admin = await Admin.findBy('email', email)
    if (!admin) {
      return response.notFound({ error: 'Aucun compte admin avec cet email.' })
    }

    const code = randomInt(100000, 999999).toString()
    const expireA = DateTime.now().plus({ minutes: 15 })

    await Verification.query().where('email', email).delete()
    await Verification.create({ email, code, expireA, utilise: false })

    await sendEmail(
      email,
      'Reinitialisation mot de passe - TO CONNECT TV',
      `
        <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; padding: 30px; background: #fff; border-radius: 12px; border: 1px solid #eee;">
          <div style="text-align: center; margin-bottom: 25px;">
            <h2 style="color: #e50914; margin: 0;">TO CONNECT TV</h2>
            <p style="color: #999; font-size: 0.9rem;">Administration</p>
          </div>
          <p style="color: #333;">Bonjour,</p>
          <p style="color: #555;">Vous avez demande la reinitialisation de votre mot de passe. Voici votre code :</p>
          <div style="text-align: center; margin: 25px 0;">
            <span style="display: inline-block; background: #f5f5f5; padding: 15px 35px; border-radius: 10px; font-size: 2rem; font-weight: 800; letter-spacing: 8px; color: #e50914; border: 2px dashed #e50914;">
              ${code}
            </span>
          </div>
          <p style="color: #999; font-size: 0.85rem; text-align: center;">Ce code expire dans 15 minutes.</p>
        </div>
      `
    )

    return response.ok({ message: 'Un code de verification a ete envoye a votre email.' })
  }

  // Reinitialiser le mot de passe avec le code
  async resetPassword({ request, response }: HttpContext) {
    const { email, code, nouveauMotDePasse } = request.only(['email', 'code', 'nouveauMotDePasse'])

    if (!email || !code || !nouveauMotDePasse) {
      return response.badRequest({ error: 'Tous les champs sont requis.' })
    }

    if (nouveauMotDePasse.length < 6) {
      return response.badRequest({ error: 'Le mot de passe doit contenir au moins 6 caracteres.' })
    }

    const verification = await Verification.query()
      .where('email', email)
      .where('code', code)
      .where('utilise', false)
      .first()

    if (!verification) {
      return response.unauthorized({ error: 'Code invalide.' })
    }

    if (DateTime.now() > verification.expireA) {
      return response.unauthorized({ error: 'Code expire. Veuillez en demander un nouveau.' })
    }

    verification.utilise = true
    await verification.save()

    const admin = await Admin.findBy('email', email)
    if (!admin) {
      return response.notFound({ error: 'Admin non trouve.' })
    }

    admin.motDePasse = await hash.make(nouveauMotDePasse)
    await admin.save()

    return response.ok({ message: 'Mot de passe reinitialise avec succes.' })
  }

  // Supprimer un administrateur spécifique
  async destroy({ params, response }: HttpContext) {
    try {
      const admin = await Admin.findOrFail(params.id)
      await admin.delete()

      return response.ok({ message: 'Administrateur supprimé avec succès' })
    } catch (error) {
      return response.status(404).send({
        error: 'Administrateur non trouvé',
        details: error.message,
      })
    }
  }
}
