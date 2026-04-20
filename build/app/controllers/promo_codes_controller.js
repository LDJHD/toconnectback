import AccessToken from '#models/access_token';
import PromoCode from '#models/promo_code';
import PromoCodeHistory from '#models/promo_code_history';
import Utilisateur from '#models/utilisateur';
export default class PromoCodesController {
    async getAdminIdFromToken(authHeader) {
        const token = authHeader?.replace('Bearer ', '');
        if (!token)
            return null;
        const accessToken = await AccessToken.query().where('token', token).first();
        return accessToken?.admin_id ?? null;
    }
    async index({ request, response }) {
        const adminId = await this.getAdminIdFromToken(request.header('Authorization'));
        if (!adminId) {
            return response.unauthorized({ message: 'Action reservee aux administrateurs' });
        }
        const codes = await PromoCode.query().orderBy('createdAt', 'desc');
        return response.ok(codes);
    }
    async history({ request, response }) {
        const adminId = await this.getAdminIdFromToken(request.header('Authorization'));
        if (!adminId) {
            return response.unauthorized({ message: 'Action reservee aux administrateurs' });
        }
        const logs = await PromoCodeHistory.query().orderBy('createdAt', 'desc').limit(200);
        return response.ok(logs);
    }
    async store({ request, response }) {
        const code = String(request.input('code', '')).trim().toUpperCase();
        const pointsValue = Number(request.input('pointsValue', 0.05));
        if (!code) {
            return response.badRequest({ message: 'Code requis' });
        }
        const adminId = await this.getAdminIdFromToken(request.header('Authorization'));
        if (!adminId) {
            return response.unauthorized({ message: 'Action reservee aux administrateurs' });
        }
        const existing = await PromoCode.findBy('code', code);
        if (existing) {
            return response.badRequest({ message: 'Ce code existe deja' });
        }
        const promoCode = await PromoCode.create({
            code,
            pointsValue,
            generatedByAdminId: adminId,
        });
        await PromoCodeHistory.create({
            promoCodeId: promoCode.id,
            code: promoCode.code,
            action: 'generated',
            adminId,
            meta: JSON.stringify({ pointsValue }),
        });
        return response.created(promoCode);
    }
    async redeem({ request, response }) {
        const code = String(request.input('code', '')).trim().toUpperCase();
        const utilisateurId = Number(request.input('utilisateurId'));
        if (!code || !utilisateurId) {
            return response.badRequest({ message: 'Code et utilisateur requis' });
        }
        const promoCode = await PromoCode.findBy('code', code);
        if (!promoCode) {
            return response.badRequest({ message: 'Code invalide ou deja utilise' });
        }
        const utilisateur = await Utilisateur.find(utilisateurId);
        if (!utilisateur) {
            return response.notFound({ message: 'Utilisateur introuvable' });
        }
        const before = Number(utilisateur.points || 0);
        const added = Number(promoCode.pointsValue || 0.05);
        const after = Number((before + added).toFixed(2));
        utilisateur.points = after;
        await utilisateur.save();
        await PromoCodeHistory.create({
            promoCodeId: promoCode.id,
            code: promoCode.code,
            action: 'redeemed',
            utilisateurId: utilisateur.id,
            pointsBefore: before,
            pointsAdded: added,
            pointsAfter: after,
            meta: JSON.stringify({ statut: utilisateur.statut }),
        });
        await promoCode.delete();
        return response.ok({
            message: 'Code applique avec succes',
            points: after,
            pointsAjoutes: added,
            statut: utilisateur.statut,
        });
    }
}
//# sourceMappingURL=promo_codes_controller.js.map