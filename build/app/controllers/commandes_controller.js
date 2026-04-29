import Commande from '#models/commande';
import CommandeItem from '#models/commande_item';
import Panier from '#models/panier';
import Utilisateur from '#models/utilisateur';
import { createCommandeValidator, updateCommandeStatutValidator } from '#validators/commande_validator';
import { generateOrderWhatsAppLink, generateCustomerOrderWhatsAppLink, generateOrderViewLink } from '#services/whatsapp_service';
import { v4 as uuidv4 } from 'uuid';
import { consumeReductionUsage, getLoyaltySummary } from '#services/loyalty_service';
export default class CommandesController {
    async store({ request, response }) {
        try {
            const data = await request.validateUsing(createCommandeValidator);
            const panier = await Panier.query()
                .where('sessionId', data.sessionId)
                .preload('items', (query) => {
                query.preload('article');
                query.preload('pack');
            })
                .firstOrFail();
            if (panier.items.length === 0) {
                return response.badRequest({ message: 'Le panier est vide' });
            }
            const montantTotal = panier.items.reduce((sum, item) => sum + item.prixUnitaire * item.quantite, 0);
            const utilisateur = await Utilisateur.findBy('email', data.utilisateurEmail);
            const loyalty = utilisateur ? await getLoyaltySummary(utilisateur) : null;
            let reductionPourcentage = 0;
            let reductionMontant = 0;
            let montantFinal = montantTotal;
            let reductionUsesRestants = 5;
            if (loyalty?.canApplyReduction && loyalty.reductionPourcentage > 0) {
                reductionPourcentage = loyalty.reductionPourcentage;
                reductionMontant = Number(((montantTotal * reductionPourcentage) / 100).toFixed(2));
                montantFinal = Number((montantTotal - reductionMontant).toFixed(2));
                reductionUsesRestants = loyalty.remainingUses;
            }
            else if (loyalty) {
                reductionUsesRestants = loyalty.remainingUses;
            }
            const numero = `CMD-${Date.now()}-${uuidv4().substring(0, 6).toUpperCase()}`;
            const commande = await Commande.create({
                numero,
                utilisateurId: utilisateur?.id || null,
                utilisateurNom: data.utilisateurNom,
                utilisateurEmail: data.utilisateurEmail,
                utilisateurTelephone: data.utilisateurTelephone,
                montantTotal,
                reductionPourcentage,
                reductionMontant,
                montantFinal,
                pointsSnapshot: loyalty?.points || 0,
                pointsPartieEntiereSnapshot: loyalty?.integerPoints || 0,
                reductionUsesRestants,
                statutClientSnapshot: loyalty?.statut || 'normal',
                statut: 'en_attente',
                notes: data.notes || null,
                adresseLivraison: data.adresseLivraison || null,
            });
            const commandeItems = [];
            for (const item of panier.items) {
                const nomArticle = item.article ? item.article.nom : (item.pack ? item.pack.nom : 'Article');
                await CommandeItem.create({
                    commandeId: commande.id,
                    articleId: item.articleId,
                    packId: item.packId,
                    nomArticle,
                    quantite: item.quantite,
                    prixUnitaire: item.prixUnitaire,
                });
                commandeItems.push({ nomArticle, quantite: item.quantite, prixUnitaire: item.prixUnitaire });
            }
            await import('#models/panier_item').then((mod) => mod.default.query().where('panierId', panier.id).delete());
            if (utilisateur && reductionPourcentage > 0) {
                const usage = await consumeReductionUsage(utilisateur, reductionPourcentage);
                commande.reductionUsesRestants = usage.remainingUses;
                commande.statutClientSnapshot = utilisateur.statut;
                await commande.save();
            }
            const commandeInfo = {
                numero,
                utilisateurNom: data.utilisateurNom,
                utilisateurTelephone: data.utilisateurTelephone,
                montantTotal,
                montantFinal: commande.montantFinal,
                reductionPourcentage: commande.reductionPourcentage,
                reductionMontant: commande.reductionMontant,
                statutClient: commande.statutClientSnapshot,
                pointsSnapshot: commande.pointsSnapshot,
                reductionUsesRestants: commande.reductionUsesRestants,
                items: commandeItems,
            };
            const whatsappLinkAdmin = generateOrderWhatsAppLink(commandeInfo);
            const whatsappLinkClient = generateCustomerOrderWhatsAppLink(commandeInfo);
            const orderViewLink = generateOrderViewLink(numero);
            await commande.load('items');
            return response.created({
                commande,
                whatsappLinkAdmin,
                whatsappLinkClient,
                orderViewLink,
            });
        }
        catch (error) {
            return response.badRequest({ message: 'Erreur lors de la création de la commande', error: error.message });
        }
    }
    async show({ params, response }) {
        try {
            const commande = await Commande.query()
                .where('numero', params.numero)
                .preload('items')
                .firstOrFail();
            return response.ok(commande);
        }
        catch (error) {
            return response.status(404).send({ message: 'Commande non trouvée' });
        }
    }
    async index({ request, response }) {
        try {
            const page = request.input('page', 1);
            const limit = request.input('limit', 20);
            const statut = request.input('statut');
            const search = request.input('search');
            let query = Commande.query().preload('items').orderBy('createdAt', 'desc');
            if (statut)
                query = query.where('statut', statut);
            if (search) {
                query = query.where((q) => {
                    q.whereILike('numero', `%${search}%`)
                        .orWhereILike('utilisateurNom', `%${search}%`)
                        .orWhereILike('utilisateurEmail', `%${search}%`)
                        .orWhereILike('utilisateurTelephone', `%${search}%`);
                });
            }
            const commandes = await query.paginate(page, limit);
            return response.ok(commandes);
        }
        catch (error) {
            return response.badRequest({ message: 'Erreur', error: error.message });
        }
    }
    async updateStatut({ params, request, response }) {
        try {
            const data = await request.validateUsing(updateCommandeStatutValidator);
            const commande = await Commande.findOrFail(params.id);
            commande.statut = data.statut;
            await commande.save();
            await commande.load('items');
            return response.ok(commande);
        }
        catch (error) {
            return response.badRequest({ message: 'Erreur', error: error.message });
        }
    }
    async historiqueByEmail({ request, response }) {
        try {
            const email = request.input('email');
            if (!email)
                return response.badRequest({ message: 'Email requis' });
            const commandes = await Commande.query()
                .where('utilisateurEmail', email)
                .preload('items')
                .orderBy('createdAt', 'desc');
            return response.ok(commandes);
        }
        catch (error) {
            return response.badRequest({ message: 'Erreur', error: error.message });
        }
    }
}
//# sourceMappingURL=commandes_controller.js.map