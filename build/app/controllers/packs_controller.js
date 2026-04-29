import Pack from '#models/pack';
import PackItem from '#models/pack_item';
import Article from '#models/article';
import { createPackValidator, addPackItemValidator } from '#validators/pack_validator';
export default class PacksController {
    async store({ request, response }) {
        try {
            const data = await request.validateUsing(createPackValidator);
            let prixTotal = 0;
            for (const item of data.items) {
                const article = await Article.findOrFail(item.articleId);
                prixTotal += (article.prixPromo || article.prix) * item.quantite;
            }
            const pack = await Pack.create({
                nom: data.nom,
                description: data.description || null,
                prixTotal,
                sessionId: data.sessionId || null,
            });
            for (const item of data.items) {
                await PackItem.create({
                    packId: pack.id,
                    articleId: item.articleId,
                    quantite: item.quantite,
                });
            }
            await pack.load('items', (query) => query.preload('article', (q) => q.preload('images')));
            return response.created(pack);
        }
        catch (error) {
            return response.badRequest({ message: 'Erreur lors de la création du pack', error: error.message });
        }
    }
    async show({ params, response }) {
        try {
            const pack = await Pack.query()
                .where('id', params.id)
                .preload('items', (query) => query.preload('article', (q) => q.preload('images')))
                .firstOrFail();
            return response.ok(pack);
        }
        catch (error) {
            return response.status(404).send({ message: 'Pack non trouvé' });
        }
    }
    async update({ params, request, response }) {
        try {
            const pack = await Pack.findOrFail(params.id);
            const nom = request.input('nom');
            const description = request.input('description');
            if (nom)
                pack.nom = nom;
            if (description !== undefined)
                pack.description = description;
            await pack.save();
            await pack.load('items', (query) => query.preload('article', (q) => q.preload('images')));
            return response.ok(pack);
        }
        catch (error) {
            return response.badRequest({ message: 'Erreur', error: error.message });
        }
    }
    async addItem({ request, response }) {
        try {
            const data = await request.validateUsing(addPackItemValidator);
            const pack = await Pack.findOrFail(data.packId);
            await Article.findOrFail(data.articleId);
            const existing = await PackItem.query()
                .where('packId', data.packId)
                .where('articleId', data.articleId)
                .first();
            if (existing) {
                existing.quantite += data.quantite;
                await existing.save();
            }
            else {
                await PackItem.create({
                    packId: data.packId,
                    articleId: data.articleId,
                    quantite: data.quantite,
                });
            }
            const items = await PackItem.query().where('packId', pack.id).preload('article');
            pack.prixTotal = items.reduce((sum, item) => {
                return sum + (item.article.prixPromo || item.article.prix) * item.quantite;
            }, 0);
            await pack.save();
            await pack.load('items', (query) => query.preload('article', (q) => q.preload('images')));
            return response.ok(pack);
        }
        catch (error) {
            return response.badRequest({ message: 'Erreur', error: error.message });
        }
    }
    async removeItem({ params, response }) {
        try {
            const item = await PackItem.findOrFail(params.itemId);
            const packId = item.packId;
            await item.delete();
            const pack = await Pack.findOrFail(packId);
            const items = await PackItem.query().where('packId', packId).preload('article');
            pack.prixTotal = items.reduce((sum, i) => {
                return sum + (i.article.prixPromo || i.article.prix) * i.quantite;
            }, 0);
            await pack.save();
            await pack.load('items', (query) => query.preload('article', (q) => q.preload('images')));
            return response.ok(pack);
        }
        catch (error) {
            return response.badRequest({ message: 'Erreur', error: error.message });
        }
    }
}
//# sourceMappingURL=packs_controller.js.map