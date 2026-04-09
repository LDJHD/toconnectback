import { HttpContext } from '@adonisjs/core/http'
import AccessToken from '#models/access_token'
import { DateTime } from 'luxon'

export default class CheckTokenValidity {
  public async handle({ request, response }: HttpContext, next: () => Promise<void>) {
    const token = request.header('Authorization')?.replace('Bearer ', '')

    if (!token) {
      return response.unauthorized({ error: 'Token manquant.' })
    }

    const accessToken = await AccessToken.query().where('token', token).first()

    if (!accessToken || DateTime.now() > accessToken.expires_at) {
      return response.unauthorized({ error: 'Token invalide ou expiré.' })
    }

    // Ajoute l'utilisateur lié au token à la requête
    request.utilisateur = accessToken.utilisateur
    await next()
  }
}
