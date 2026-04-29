import Notification from '#models/notification';
import { NotificationCreateValidator, NotificationUpdateValidator } from '#validators/notification';
export default class NotificationsController {
    async index({ response }) {
        const notifications = await Notification.all();
        return response.ok(notifications);
    }
    async store({ request, response }) {
        try {
            const data = await request.validateUsing(NotificationCreateValidator);
            const notification = await Notification.create(data);
            return response.created(notification);
        }
        catch (error) {
            return response.badRequest({ message: error.messages || 'Erreur lors de la création de la notification' });
        }
    }
    async show({ params, response }) {
        const notification = await Notification.findOrFail(params.id);
        return response.ok(notification);
    }
    async update({ params, request, response }) {
        try {
            const notification = await Notification.findOrFail(params.id);
            const data = await request.validateUsing(NotificationUpdateValidator);
            notification.merge(data);
            await notification.save();
            return response.ok(notification);
        }
        catch (error) {
            return response.badRequest({ message: error.messages || 'Erreur lors de la mise à jour de la notification' });
        }
    }
    async destroy({ params, response }) {
        const notification = await Notification.findOrFail(params.id);
        await notification.delete();
        return response.ok({ message: 'Notification supprimée avec succès' });
    }
}
//# sourceMappingURL=notifications_controller.js.map