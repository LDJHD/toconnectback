import TypeCompte from '#models/type_compte';
import fs from 'fs';
import path from 'path';
import app from '@adonisjs/core/services/app';
import { TypeCompteCreateValidator } from '#validators/typecompte';
export default class TypesComptesController {
    async index({ response }) {
        const typesComptes = await TypeCompte.all();
        return response.ok(typesComptes);
    }
    async store({ request, response }) {
        try {
            const data = await request.validateUsing(TypeCompteCreateValidator);
            const image = request.file('image', {
                extnames: ['jpg', 'jpeg', 'png'],
                size: '152mb',
            });
            let imagePath = null;
            if (image) {
                imagePath = `uploads/${new Date().getTime()}_${image.clientName}`;
                await image.move(app.publicPath('uploads'), {
                    name: path.basename(imagePath),
                });
            }
            const payload = {
                ...data,
                image: imagePath || null,
                composition: data.composition ?? '',
            };
            const typeCompte = await TypeCompte.create(payload);
            return response.created(typeCompte);
        }
        catch (error) {
            return response.badRequest({ message: error.messages || 'Erreur lors de la création du type de compte' });
        }
    }
    async update({ params, request, response }) {
        try {
            console.log('=== UPDATE TypeCompte ===');
            console.log('params.id:', params.id);
            console.log('all data:', request.all());
            const typeCompte = await TypeCompte.findOrFail(params.id);
            const allData = request.all();
            console.log('Received data:', allData);
            if (allData.nom)
                typeCompte.nom = allData.nom;
            if (allData.prix)
                typeCompte.prix = Number(allData.prix);
            if (allData.nombreEcran)
                typeCompte.nombreEcran = Number(allData.nombreEcran);
            if (allData.plateforme)
                typeCompte.plateforme = allData.plateforme;
            if (allData.description !== undefined)
                typeCompte.description = allData.description;
            if (allData.composition !== undefined && allData.composition !== null) {
                typeCompte.composition = allData.composition;
            }
            const image = request.file('image', {
                extnames: ['jpg', 'jpeg', 'png'],
                size: '152mb',
            });
            if (image) {
                if (typeCompte.image) {
                    const oldImagePath = app.publicPath(typeCompte.image);
                    if (fs.existsSync(oldImagePath)) {
                        fs.unlinkSync(oldImagePath);
                    }
                }
                const imagePath = `uploads/${new Date().getTime()}_${image.clientName}`;
                await image.move(app.publicPath('uploads'), { name: path.basename(imagePath) });
                typeCompte.image = imagePath;
            }
            await typeCompte.save();
            return response.ok(typeCompte);
        }
        catch (error) {
            console.log('=== ERREUR UPDATE ===');
            console.log('error:', error);
            return response.badRequest({ message: error.messages || error.message || 'Erreur lors de la mise à jour du type de compte' });
        }
    }
    async show({ params, response }) {
        try {
            const typeCompte = await TypeCompte.findOrFail(params.id);
            return response.ok(typeCompte);
        }
        catch (error) {
            return response.notFound({ message: 'Type de compte non trouvé' });
        }
    }
    async destroy({ params, response }) {
        try {
            const typeCompte = await TypeCompte.findOrFail(params.id);
            if (typeCompte.image) {
                const oldImagePath = app.publicPath(typeCompte.image);
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                }
            }
            await typeCompte.delete();
            return response.ok({ message: 'Type de compte supprimé avec succès' });
        }
        catch (error) {
            return response.notFound({ message: 'Type de compte non trouvé' });
        }
    }
}
//# sourceMappingURL=type_comptes_controller.js.map