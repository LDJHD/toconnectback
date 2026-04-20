import router from '@adonisjs/core/services/router'
import AbonnementsController from '#controllers/abonnements_controller'
import AdminsController from '#controllers/admin_controller'
import ComptesController from '#controllers/comptes_controller'
import NotificationsController from '#controllers/notifications_controller'
import ProfilsController from '#controllers/profils_controller'
import TypesComptesController from '#controllers/type_comptes_controller'
import UtilisateursController from '#controllers/utilisateurs_controller'
import VerificationsController from '#controllers/verifications_controller'
import ProduitsController from '#controllers/produits_controller'
import CategoriesController from '#controllers/categories_controller'
import SousCategoriesController from '#controllers/sous_categories_controller'
import ArticlesController from '#controllers/articles_controller'
import PaniersController from '#controllers/paniers_controller'
import CommandesController from '#controllers/commandes_controller'
import PacksController from '#controllers/packs_controller'
import PromoCodesController from '#controllers/promo_codes_controller'
import { middleware } from '#start/kernel'



router.get('/', async () => {
  return { hello: 'world' }
})

// Routes pour Abonnements avec le préfixe 'api/v1'
router.group(() => {
 // Liste tous les abonnements
router.get('/abonnements', (ctx) => new AbonnementsController().index(ctx))

// Créer un nouvel abonnement
router.post('/abonnementscreate', (ctx) => new AbonnementsController().store(ctx))
// Afficher un abonnement spécifique
router.get('/abonnements/:id', (ctx) => new AbonnementsController().show(ctx))

// Afficher les abonnements simultanés d'un abonnement spécifique
router.get('/abonnements/:id/simultanes', (ctx) => new AbonnementsController().showByAbonnement(ctx))

// Routes pour les produits
router.get('/produits', (ctx) => new ProduitsController().index(ctx))

router.get('/produits/appartements', (ctx) => new ProduitsController().appartements(ctx))

router.get('/produits/restaurations', (ctx) => new ProduitsController().restaurations(ctx))

router.get('/produits/divers', (ctx) => new ProduitsController().divers(ctx))

router.get('/produits/:id', (ctx) => new ProduitsController().show(ctx))

router.post('/produits/search', (ctx) => new ProduitsController().search(ctx))

router.get('/produits/first-ten', (ctx) => new ProduitsController().getFirstTenProducts(ctx))

router.get('/produits/last-ten', (ctx) => new ProduitsController().getLastTenProducts(ctx))

router.get('/produits/:id/with-category', (ctx) => new ProduitsController().getProductWithCategoryProducts(ctx))

// Mettre à jour un abonnement spécifique
router.put('/abonnements/update/:id', (ctx) => new AbonnementsController().update(ctx)).middleware(middleware.checktokenvalidity())
// Mettre à jour un abonnement spécifique
router.put('/abonnements/reabonnement/:id', (ctx) => new AbonnementsController().relancerAbonnement(ctx)).middleware(middleware.checktokenvalidity())

// Supprimer un abonnement spécifique
router.delete('/abonnements/delete/:id', (ctx) => new AbonnementsController().destroy(ctx)).middleware(middleware.checktokenvalidity())

// Admin routes
router.get('/admins', (ctx) => new AdminsController().index(ctx))

// Créer un administrateur
router.post('/admins/create', (ctx) => new AdminsController().store(ctx))

router.post('/admins/login', (ctx) => new AdminsController().login(ctx))

router.post('/admins/forgot-password', (ctx) => new AdminsController().forgotPassword(ctx))
router.post('/admins/reset-password', (ctx) => new AdminsController().resetPassword(ctx))

// Afficher un administrateur spécifique
router.get('/admins/:id', (ctx) => new AdminsController().show(ctx))

// Mettre à jour un administrateur spécifique
router.put('/admins/update/:id', (ctx) => new AdminsController().update(ctx)).middleware(middleware.checktokenvalidity())

// Supprimer un administrateur spécifique
router.delete('/admins/delete/:id', (ctx) => new AdminsController().destroy(ctx)).middleware(middleware.checktokenvalidity())

// Compte routes
router.get('/comptes', (ctx) => new ComptesController().index(ctx))

// Créer un administrateur
router.post('/comptescreate', (ctx) => new ComptesController().store(ctx))

// Afficher un administrateur spécifique
router.get('/comptes/:id', (ctx) => new ComptesController().show(ctx))

// Mettre à jour un administrateur spécifique
router.put('/comptes/update/:id', (ctx) => new ComptesController().update(ctx)).middleware(middleware.checktokenvalidity())

// Supprimer un administrateur spécifique
router.delete('/comptes/delete/:id', (ctx) => new ComptesController().destroy(ctx)).middleware(middleware.checktokenvalidity())

// Notifications routes
router.get('/notifications', (ctx) => new NotificationsController().index(ctx))

// Créer une notification
router.post('/notificationscreate', (ctx) => new NotificationsController().store(ctx))

// Afficher une notification spécifique
router.get('/notifications/:id', (ctx) => new NotificationsController().show(ctx))

// Mettre à jour une notification spécifique
router.put('/notifications/update/:id', (ctx) => new NotificationsController().update(ctx)).middleware(middleware.checktokenvalidity())

// Supprimer une notification spécifique
router.delete('/notifications/delete/:id', (ctx) => new NotificationsController().destroy(ctx)).middleware(middleware.checktokenvalidity())

// Profil routes
router.get('/profils', (ctx) => new ProfilsController().index(ctx))

// Créer un profil
router.post('/profilscreate', (ctx) => new ProfilsController().store(ctx)).middleware(middleware.checktokenvalidity())

// Afficher un profil spécifique
router.get('/profils/:id', (ctx) => new ProfilsController().show(ctx))

// Mettre à jour un profil spécifique
router.put('/profils/update/:id', (ctx) => new ProfilsController().update(ctx)).middleware(middleware.checktokenvalidity())

// Supprimer un profil spécifique
router.delete('/profils/delete/:id', (ctx) => new ProfilsController().destroy(ctx)).middleware(middleware.checktokenvalidity())

// Type routes
router.get('/type_comptes', (ctx) => new TypesComptesController().index(ctx))

// Créer un type de compte
router.post('/type_comptescreate', (ctx) => new TypesComptesController().store(ctx)).middleware(middleware.checktokenvalidity())

// Afficher un type de compte spécifique
router.get('/type_comptes/:id', (ctx) => new TypesComptesController().show(ctx))

// Mettre à jour un type de compte spécifique
router.put('/type_comptes/update/:id', (ctx) => new TypesComptesController().update(ctx)).middleware(middleware.checktokenvalidity())

// Supprimer un type de compte spécifique
router.delete('/type_comptes/delete/:id', (ctx) => new TypesComptesController().destroy(ctx)).middleware(middleware.checktokenvalidity())

// Utilisateurs routes
router.post('/utilisateurs/verifications', (ctx) => new UtilisateursController().requestVerificationCode(ctx))
router.get('/utilisateurs/:id/loyalty-summary', (ctx) => new UtilisateursController().loyaltySummary(ctx))

router.get('/utilisateurs', (ctx) => new UtilisateursController().index(ctx)).middleware(middleware.checktokenvalidity())

// Créer un utilisateur
router.post('/utilisateurscreate', (ctx) => new UtilisateursController().store(ctx)).middleware(middleware.checktokenvalidity())

// Afficher un utilisateur spécifique
router.get('/utilisateurs/:id', (ctx) => new UtilisateursController().show(ctx))

// Mettre à jour un utilisateur spécifique
router.put('/utilisateurs/update/:id', (ctx) => new UtilisateursController().update(ctx)).middleware(middleware.checktokenvalidity())

// Supprimer un utilisateur spécifique
router.delete('/utilisateurs/delete/:id', (ctx) => new UtilisateursController().destroy(ctx)).middleware(middleware.checktokenvalidity())

// Vérifications routes
router.post('/verifications/verify-code', (ctx) => new VerificationsController().verifyCode(ctx))

router.get('/verifications', (ctx) => new VerificationsController().index(ctx))

// Créer une vérification
router.post('/verificationscreate', (ctx) => new VerificationsController().store(ctx))

// Afficher une vérification spécifique
router.get('/verifications/:id', (ctx) => new VerificationsController().show(ctx))

// Mettre à jour une vérification spécifique
router.put('/verifications/update/:id', (ctx) => new VerificationsController().update(ctx)).middleware(middleware.checktokenvalidity())

// Supprimer une vérification spécifique
router.delete('/verifications/delete/:id', (ctx) => new VerificationsController().destroy(ctx)).middleware(middleware.checktokenvalidity())

// ==================== E-COMMERCE ====================

// Categories routes
router.get('/categories', (ctx) => new CategoriesController().index(ctx))
router.get('/categories/all', (ctx) => new CategoriesController().all(ctx))
router.get('/categories/:id', (ctx) => new CategoriesController().show(ctx))
router.post('/categories/create', (ctx) => new CategoriesController().store(ctx)).middleware(middleware.checktokenvalidity())
router.put('/categories/update/:id', (ctx) => new CategoriesController().update(ctx)).middleware(middleware.checktokenvalidity())
router.delete('/categories/delete/:id', (ctx) => new CategoriesController().destroy(ctx)).middleware(middleware.checktokenvalidity())

// Sous-categories routes
router.get('/sous-categories', (ctx) => new SousCategoriesController().index(ctx))
router.get('/sous-categories/:categoryId', (ctx) => new SousCategoriesController().showByCategory(ctx))
router.post('/sous-categories/create', (ctx) => new SousCategoriesController().store(ctx)).middleware(middleware.checktokenvalidity())
router.put('/sous-categories/update/:id', (ctx) => new SousCategoriesController().update(ctx)).middleware(middleware.checktokenvalidity())
router.delete('/sous-categories/delete/:id', (ctx) => new SousCategoriesController().destroy(ctx)).middleware(middleware.checktokenvalidity())

// Articles routes
router.get('/articles', (ctx) => new ArticlesController().index(ctx))
router.get('/articles/admin', (ctx) => new ArticlesController().allAdmin(ctx))
router.get('/articles/featured', (ctx) => new ArticlesController().featured(ctx))
router.get('/articles/category/:categoryId', (ctx) => new ArticlesController().byCategory(ctx))
router.post('/articles/search', (ctx) => new ArticlesController().search(ctx))
router.get('/articles/:id', (ctx) => new ArticlesController().show(ctx))
router.post('/articles/create', (ctx) => new ArticlesController().store(ctx)).middleware(middleware.checktokenvalidity())
router.put('/articles/update/:id', (ctx) => new ArticlesController().update(ctx)).middleware(middleware.checktokenvalidity())
router.delete('/articles/delete/:id', (ctx) => new ArticlesController().destroy(ctx)).middleware(middleware.checktokenvalidity())
router.delete('/articles/image/:imageId', (ctx) => new ArticlesController().deleteImage(ctx)).middleware(middleware.checktokenvalidity())

// Panier routes
router.get('/panier/:sessionId', (ctx) => new PaniersController().show(ctx))
router.post('/panier/add', (ctx) => new PaniersController().addItem(ctx))
router.put('/panier/update/:itemId', (ctx) => new PaniersController().updateItem(ctx))
router.delete('/panier/remove/:itemId', (ctx) => new PaniersController().removeItem(ctx))
router.delete('/panier/clear/:sessionId', (ctx) => new PaniersController().clear(ctx))

// Commandes routes
router.post('/commandes/create', (ctx) => new CommandesController().store(ctx))
router.get('/commandes/view/:numero', (ctx) => new CommandesController().show(ctx))
router.post('/commandes/historique', (ctx) => new CommandesController().historiqueByEmail(ctx))
router.get('/commandes', (ctx) => new CommandesController().index(ctx)).middleware(middleware.checktokenvalidity())
router.put('/commandes/statut/:id', (ctx) => new CommandesController().updateStatut(ctx)).middleware(middleware.checktokenvalidity())

// Packs routes
router.post('/packs/create', (ctx) => new PacksController().store(ctx))
router.get('/packs/:id', (ctx) => new PacksController().show(ctx))
router.put('/packs/update/:id', (ctx) => new PacksController().update(ctx))
router.post('/packs/add-item', (ctx) => new PacksController().addItem(ctx))
router.delete('/packs/remove-item/:itemId', (ctx) => new PacksController().removeItem(ctx))

// Codes promo / points
router.get('/promo-codes', (ctx) => new PromoCodesController().index(ctx)).middleware(middleware.checktokenvalidity())
router.get('/promo-codes/history', (ctx) => new PromoCodesController().history(ctx)).middleware(middleware.checktokenvalidity())
router.post('/promo-codes/create', (ctx) => new PromoCodesController().store(ctx)).middleware(middleware.checktokenvalidity())
router.post('/promo-codes/redeem', (ctx) => new PromoCodesController().redeem(ctx))

}).prefix('/api/v1')  // Applique le préfixe api/v1 à toutes les routes du groupe

