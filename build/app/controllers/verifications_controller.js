import Utilisateur from '#models/utilisateur';
import Verification from '#models/verification';
import { DateTime } from 'luxon';
import { VerificationCreateValidator, VerificationUpdateValidator } from '#validators/verification';
import { v4 as uuidv4 } from 'uuid';
import AccessToken from '#models/access_token';
export default class VerificationsController {
    async verifyCode({ request, response }) {
        const { email, code } = request.only(['email', 'code']);
        const verification = await Verification
            .query()
            .where('email', email)
            .andWhere('code', code)
            .andWhere('utilise', false)
            .first();
        if (!verification) {
            return response.unauthorized({ error: 'Code invalide ou inexistant.' });
        }
        if (DateTime.now() > verification.expireA) {
            return response.unauthorized({ error: 'Code expiré, veuillez en générer un nouveau.' });
        }
        verification.utilise = true;
        await verification.save();
        const utilisateur = await Utilisateur.findBy('email', email);
        if (!utilisateur) {
            return response.unauthorized({ error: 'Utilisateur introuvable.' });
        }
        const token = uuidv4();
        const expiresAt = DateTime.now().plus({ hours: 12 });
        await AccessToken.create({
            utilisateur_id: utilisateur.id,
            token,
            type: 'Bearer',
            expires_at: expiresAt,
        });
        return response.ok({ message: 'Connexion réussie.', utilisateur, token });
    }
    async index({ response }) {
        const verifications = await Verification.all();
        return response.ok(verifications);
    }
    async store({ request, response }) {
        const payload = await request.validateUsing(VerificationCreateValidator);
        const verification = await Verification.create({
            ...payload,
            expireA: payload.expireA
                ? DateTime.fromJSDate(new Date(payload.expireA))
                : DateTime.now().plus({ minutes: 10 }),
        });
        return response.created(verification);
    }
    async show({ params, response }) {
        const verification = await Verification.findOrFail(params.id);
        return response.ok(verification);
    }
    async update({ params, request, response }) {
        try {
            const verification = await Verification.findOrFail(params.id);
            const payload = await request.validateUsing(VerificationUpdateValidator);
            verification.merge({
                ...payload,
                expireA: payload.expireA ? DateTime.fromJSDate(new Date(payload.expireA)) : verification.expireA,
            });
            await verification.save();
            return response.ok({ message: 'Vérification mise à jour avec succès', data: verification });
        }
        catch (error) {
            return response.status(400).send({
                error: 'Erreur lors de la mise à jour de la vérification',
                details: error.messages || 'Données invalides'
            });
        }
    }
    async destroy({ params, response }) {
        const verification = await Verification.findOrFail(params.id);
        await verification.delete();
        return response.ok({ message: 'Vérification supprimée avec succès' });
    }
}
//# sourceMappingURL=verifications_controller.js.map