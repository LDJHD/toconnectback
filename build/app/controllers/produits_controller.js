import db from '@adonisjs/lucid/services/db';
export default class ProduitsController {
    async index({ response }) {
        try {
            const products = await db
                .from('produit')
                .select('produit.*', 'categorie.nom as nom_categorie')
                .leftJoin('categorie', 'produit.categorie_id', 'categorie.id')
                .groupBy('produit.id', 'produit.nom');
            return response.status(200).json(products);
        }
        catch (error) {
            console.error('Erreur lors de la récupération des produits:', error);
            return response.status(500).json({ error: 'Erreur serveur' });
        }
    }
    async appartements({ response }) {
        try {
            const products = await db
                .from('produit')
                .select('produit.*', 'famille.nom as nom_famille')
                .leftJoin('famille', 'produit.famille_id', 'famille.id')
                .where('famille.nom', 'Appartement')
                .groupBy('produit.id', 'produit.nom');
            return response.status(200).json(products);
        }
        catch (error) {
            console.error('Erreur lors de la récupération des produits:', error);
            return response.status(500).json({ error: 'Erreur serveur' });
        }
    }
    async restaurations({ response }) {
        try {
            const products = await db
                .from('produit')
                .select('produit.*', 'famille.nom as nom_famille')
                .leftJoin('famille', 'produit.famille_id', 'famille.id')
                .where('famille.nom', 'Restauration')
                .groupBy('produit.id', 'produit.nom');
            return response.status(200).json(products);
        }
        catch (error) {
            console.error('Erreur lors de la récupération des produits:', error);
            return response.status(500).json({ error: 'Erreur serveur' });
        }
    }
    async divers({ response }) {
        try {
            const products = await db
                .from('produit')
                .select('produit.*', 'famille.nom as nom_famille')
                .leftJoin('famille', 'produit.famille_id', 'famille.id')
                .where('famille.nom', 'Divers')
                .groupBy('produit.id', 'produit.nom');
            return response.status(200).json(products);
        }
        catch (error) {
            console.error('Erreur lors de la récupération des produits:', error);
            return response.status(500).json({ error: 'Erreur serveur' });
        }
    }
    async show({ params, response }) {
        try {
            const id = params.id;
            if (!id) {
                return response.status(404).json({ error: 'id non fourni' });
            }
            const product = await db
                .from('produit')
                .select('produit.*', 'categorie.id as iden_categorie', 'categorie.nom as nom_categorie', db.raw('DATE_FORMAT(produit.created_at, "%d/%m/%Y %H:%i:%s") as created_at'), 'stock.quantite_stock as stock_quantite', 'stock.created_at as stock_created_at', db.raw('COUNT(details_vente.id) as total_ventes'))
                .leftJoin('categorie', 'produit.categorie_id', 'categorie.id')
                .leftJoin('stock', 'produit.id', 'stock.produit_id')
                .leftJoin('details_vente', 'produit.id', 'details_vente.produit_id')
                .where('produit.id', id)
                .groupBy('produit.id', 'stock.quantite_stock', 'stock.created_at')
                .first();
            if (!product) {
                return response.status(404).json({ error: 'Produit non trouvé' });
            }
            const supplements = await db
                .from('supplement')
                .select('supplement.*', 'unit.nom as unit', 'unit.id as unit_id')
                .leftJoin('unit', 'supplement.unit', 'unit.id')
                .where('supplement.produit_id', id);
            return response.status(200).json({
                produit: product,
                supplements: supplements
            });
        }
        catch (error) {
            console.error('Erreur serveur:', error);
            return response.status(500).json({ error: 'Erreur serveur' });
        }
    }
    async search({ request, response }) {
        try {
            const { valeur } = request.all();
            const products = await db
                .from('produit')
                .select('produit.*', 'categorie.nom as nom_categorie')
                .leftJoin('categorie', 'produit.categorie_id', 'categorie.id')
                .leftJoin('famille', 'produit.famille_id', 'famille.id')
                .where('produit.code_barre', 'like', `%${valeur}%`)
                .orWhere('produit.nom', 'like', `%${valeur}%`)
                .orWhere('categorie.nom', 'like', `%${valeur}%`)
                .orWhere('famille.nom', 'like', `%${valeur}%`);
            if (products.length === 0) {
                return response.status(404).json({ message: 'Aucun produit trouvé' });
            }
            return response.status(200).json(products);
        }
        catch (error) {
            console.error('Erreur serveur:', error);
            return response.status(500).json({ error: 'Erreur serveur' });
        }
    }
    async getLastTenProducts({ response }) {
        try {
            const products = await db
                .from('produit')
                .select('produit.*', 'categorie.nom as nom_categorie')
                .leftJoin('categorie', 'produit.categorie_id', 'categorie.id')
                .orderBy('produit.created_at', 'desc')
                .limit(10);
            if (products.length === 0) {
                return response.status(404).json({ error: 'Aucun produit trouvé' });
            }
            return response.status(200).json(products);
        }
        catch (error) {
            console.error('Erreur lors de la récupération des derniers produits:', error);
            return response.status(500).json({ error: 'Erreur serveur' });
        }
    }
    async getFirstTenProducts({ response }) {
        try {
            const products = await db
                .from('produit')
                .select('produit.*', 'categorie.nom as nom_categorie')
                .leftJoin('categorie', 'produit.categorie_id', 'categorie.id')
                .orderBy('produit.created_at', 'asc')
                .limit(10);
            if (products.length === 0) {
                return response.status(404).json({ error: 'Aucun produit trouvé' });
            }
            return response.status(200).json(products);
        }
        catch (error) {
            console.error('Erreur lors de la récupération des premiers produits:', error);
            return response.status(500).json({ error: 'Erreur serveur' });
        }
    }
    async getProductWithCategoryProducts({ params, response }) {
        try {
            const id = params.id;
            if (!id) {
                return response.status(404).json({ error: 'id non fourni' });
            }
            const productDetails = await db
                .from('produit')
                .select('produit.*', 'categorie.nom as nom_categorie', 'famille.nom as nom_famille', db.raw('DATE_FORMAT(produit.created_at, "%d/%m/%Y %H:%i:%s") as created_at'))
                .leftJoin('categorie', 'produit.categorie_id', 'categorie.id')
                .leftJoin('famille', 'produit.famille_id', 'famille.id')
                .where('produit.id', id)
                .first();
            if (!productDetails) {
                return response.status(404).json({ error: 'Produit non trouvé' });
            }
            const categoryProducts = await db
                .from('produit')
                .select('produit.*', 'categorie.nom as nom_categorie', 'famille.nom as nom_famille', db.raw('DATE_FORMAT(produit.created_at, "%d/%m/%Y %H:%i:%s") as created_at'))
                .leftJoin('categorie', 'produit.categorie_id', 'categorie.id')
                .leftJoin('famille', 'produit.famille_id', 'famille.id')
                .where('categorie.id', productDetails.categorie_id)
                .whereNot('produit.id', id)
                .orderBy('produit.created_at', 'desc');
            return response.status(200).json({
                details: productDetails,
                autres_produits: categoryProducts
            });
        }
        catch (error) {
            console.error('Erreur lors de la récupération des produits:', error);
            return response.status(500).json({ error: 'Erreur serveur' });
        }
    }
}
//# sourceMappingURL=produits_controller.js.map