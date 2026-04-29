import { DateTime } from 'luxon';
import Compte from '#models/compte';
import { CompteCreateValidator, CompteUpdateValidator } from '#validators/compte';
export default class ComptesController {
    async index({ response }) {
        try {
            const comptes = await Compte.all();
            return response.ok(comptes);
        }
        catch (error) {
            console.error(error);
            return response.internalServerError({ message: 'Erreur lors de la récupération des comptes' });
        }
    }
    async store({ request, response }) {
        try {
            const data = await request.validateUsing(CompteCreateValidator);
            const compteExistant = await Compte.query()
                .where('emailCompte', data.emailCompte)
                .first();
            if (compteExistant) {
                return response.badRequest({
                    message: 'Un compte avec cet email existe déjà'
                });
            }
            const compte = await Compte.create({
                ...data,
                dateExpiration: DateTime.fromJSDate(new Date(data.dateExpiration)),
            });
            return response.created(compte);
        }
        catch (error) {
            console.error(error);
            return response.badRequest({ message: error.messages || 'Erreur lors de la création du compte' });
        }
    }
    async show({ params, response }) {
        try {
            const compte = await Compte.findOrFail(params.id);
            return response.ok(compte);
        }
        catch (error) {
            console.error(error);
            return response.notFound({ message: 'Compte non trouvé' });
        }
    }
    async update({ params, request, response }) {
        try {
            const data = await request.validateUsing(CompteUpdateValidator);
            const compte = await Compte.findOrFail(params.id);
            if (data.emailCompte)
                compte.emailCompte = data.emailCompte;
            if (data.motDePasse)
                compte.motDePasse = data.motDePasse;
            if (data.plateforme)
                compte.plateforme = data.plateforme;
            if (data.nbUtilisateurs)
                compte.nbUtilisateurs = data.nbUtilisateurs;
            if (data.dateExpiration) {
                compte.dateExpiration = DateTime.fromJSDate(data.dateExpiration);
            }
            await compte.save();
            return response.ok(compte);
        }
        catch (error) {
            console.error(error);
            return response.badRequest({ message: error.messages || 'Erreur lors de la mise à jour du compte' });
        }
    }
    async destroy({ params, response }) {
        try {
            const compte = await Compte.findOrFail(params.id);
            await compte.delete();
            return response.ok({ message: 'Compte supprimé avec succès' });
        }
        catch (error) {
            console.error(error);
            return response.notFound({ message: 'Compte non trouvé' });
        }
    }
}
//# sourceMappingURL=comptes_controller.js.map