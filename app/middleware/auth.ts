import { HttpContext } from '@adonisjs/core/http'
import AccessToken from '#models/access_token'
import { DateTime } from 'luxon'

export default class AuthMiddleware {
  async handle({ request, response }: HttpContext, next: () => Promise<void>) {
    const token = request.header('Authorization')?.replace('Bearer ', '')

    if (!token) {
      return response.unauthorized({ error: 'Token manquant.' })
    }

    // Vérifier si le token existe et s'il est valide
    const accessToken = await AccessToken.query()
      .where('token', token)
      .andWhere('expires_at', '>', DateTime.now()) // Vérifie si le token n'est pas expiré
      .first()

    if (!accessToken) {
      return response.unauthorized({ error: 'Token invalide ou expiré.' })
    }

    // Token valide, on continue avec la requête
    await next()
  }
}
