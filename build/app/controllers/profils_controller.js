import Profil from '#models/profil';
import { ProfilCreateValidator, ProfilUpdateValidator } from '#validators/profil';
export default class ProfilsController {
    async index({ response }) {
        const profils = await Profil.all();
        return response.ok(profils);
    }
    async store({ request, response }) {
        try {
            const data = await request.validateUsing(ProfilCreateValidator);
            const profilExistant = await Profil.query()
                .where('compteId', data.compteId)
                .where('nomProfil', data.nomProfil)
                .where('pin', data.pin)
                .first();
            if (profilExistant) {
                return response.badRequest({
                    message: 'Un profil avec le même nom et PIN existe déjà pour ce compte'
                });
            }
            const profil = await Profil.create(data);
            return response.created(profil);
        }
        catch (error) {
            return response.badRequest({ message: error.messages || 'Erreur lors de la création du profil' });
        }
    }
    async show({ params, response }) {
        try {
            const profil = await Profil.findOrFail(params.id);
            return response.ok(profil);
        }
        catch (error) {
            return response.notFound({ message: 'Profil non trouvé' });
        }
    }
    async update({ params, request, response }) {
        try {
            const profil = await Profil.findOrFail(params.id);
            const data = await request.validateUsing(ProfilUpdateValidator);
            profil.merge(data);
            await profil.save();
            return response.ok(profil);
        }
        catch (error) {
            return response.badRequest({ message: error.messages || 'Erreur lors de la mise à jour du profil' });
        }
    }
    async destroy({ params, response }) {
        try {
            const profil = await Profil.findOrFail(params.id);
            await profil.delete();
            return response.ok({ message: 'Profil supprimé avec succès' });
        }
        catch (error) {
            return response.notFound({ message: 'Profil non trouvé' });
        }
    }
}
//# sourceMappingURL=profils_controller.js.map