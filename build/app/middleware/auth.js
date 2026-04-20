import AccessToken from '#models/access_token';
import { DateTime } from 'luxon';
export default class AuthMiddleware {
    async handle({ request, response }, next) {
        const token = request.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            return response.unauthorized({ error: 'Token manquant.' });
        }
        const accessToken = await AccessToken.query().where('token', token).first();
        if (!accessToken || !accessToken.expires_at || DateTime.now() > accessToken.expires_at) {
            return response.unauthorized({ error: 'Token invalide ou expiré.' });
        }
        await next();
    }
}
//# sourceMappingURL=auth.js.map