import Notification from '#models/notification'
import { NotificationCreateValidator, NotificationUpdateValidator } from '#validators/notification'
import { HttpContext } from '@adonisjs/core/http'


export default class NotificationsController {
  // Récupérer toutes les notifications
  async index({ response }: HttpContext) {
    const notifications = await Notification.all()
    return response.ok(notifications)
  }

  // Créer une nouvelle notification
  async store({ request, response }: HttpContext) {
    try {
      // Validation des données de la requête
      const data = await request.validateUsing(NotificationCreateValidator)

      // Création de la notification
      const notification = await Notification.create(data)

      return response.created(notification)
    } catch (error) {
      return response.badRequest({ message: error.messages || 'Erreur lors de la création de la notification' })
    }
  }

  // Récupérer une notification par son ID
  async show({ params, response }: HttpContext) {
    const notification = await Notification.findOrFail(params.id)
    return response.ok(notification)
  }

  // Mettre à jour une notification existante
  async update({ params, request, response }: HttpContext) {
    try {
      // Récupérer la notification à mettre à jour
      const notification = await Notification.findOrFail(params.id)

      // Validation des données de la requête
      const data = await request.validateUsing(NotificationUpdateValidator)

      // Fusionner les données validées avec les données de la notification existante
      notification.merge(data)

      // Sauvegarder la notification mise à jour
      await notification.save()

      return response.ok(notification)
    } catch (error) {
      return response.badRequest({ message: error.messages || 'Erreur lors de la mise à jour de la notification' })
    }
  }

  // Supprimer une notification
  async destroy({ params, response }: HttpContext) {
    const notification = await Notification.findOrFail(params.id)
    await notification.delete()

    return response.ok({ message: 'Notification supprimée avec succès' })
  }
}
