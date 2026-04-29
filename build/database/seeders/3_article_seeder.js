import { BaseSeeder } from '@adonisjs/lucid/seeders';
import Category from '#models/category';
import Article from '#models/article';
export default class ArticleSeeder extends BaseSeeder {
    async run() {
        const categories = await Category.query().preload('sousCategories');
        const catMap = {};
        for (const cat of categories) {
            catMap[cat.slug] = cat;
        }
        const getSousCatId = (catSlug, sousSlug) => {
            const cat = catMap[catSlug];
            if (!cat)
                return null;
            const sc = cat.sousCategories.find((s) => s.slug === sousSlug);
            return sc?.id || null;
        };
        const articles = [
            { nom: 'Riz parfumé 5kg', description: 'Riz parfumé de qualité supérieure, grain long. Idéal pour accompagner tous vos plats.', prix: 4500, stock: 50, categorySlug: 'supermarche', enVedette: true },
            { nom: 'Huile végétale 5L', description: 'Huile végétale raffinée pour la cuisine quotidienne. 100% naturelle.', prix: 6000, stock: 35, categorySlug: 'supermarche' },
            { nom: 'Lait en poudre Nido 900g', description: 'Lait en poudre enrichi en vitamines et minéraux. Pour toute la famille.', prix: 5500, prixPromo: 4800, stock: 40, categorySlug: 'supermarche', enVedette: true },
            { nom: 'Sucre en morceaux 1kg', description: 'Sucre blanc de qualité premium, conditionné en morceaux réguliers.', prix: 1200, stock: 80, categorySlug: 'supermarche' },
            { nom: 'Pâtes spaghetti 500g', description: 'Spaghetti de blé dur, cuisson al dente parfaite.', prix: 800, stock: 60, categorySlug: 'supermarche' },
            { nom: 'Savon de Marseille 400g', description: 'Savon traditionnel de Marseille, multi-usage pour le ménage et la lessive.', prix: 1500, stock: 45, categorySlug: 'supermarche' },
            { nom: 'Eau minérale pack 6x1.5L', description: 'Pack de 6 bouteilles d\'eau minérale naturelle.', prix: 2500, prixPromo: 2000, stock: 30, categorySlug: 'supermarche' },
            { nom: 'Chemise slim fit blanche', description: 'Chemise homme coupe slim fit en coton premium. Col classique, boutonnière soignée.', prix: 12000, stock: 25, categorySlug: 'vetement', sousCatSlug: 'homme', enVedette: true },
            { nom: 'Jean slim bleu foncé', description: 'Jean homme coupe slim, denim stretch confortable. Lavage bleu foncé.', prix: 15000, prixPromo: 12000, stock: 20, categorySlug: 'vetement', sousCatSlug: 'homme' },
            { nom: 'Polo classique noir', description: 'Polo homme en coton piqué. Coupe régulière, col côtelé.', prix: 8500, stock: 30, categorySlug: 'vetement', sousCatSlug: 'homme' },
            { nom: 'T-shirt col rond blanc', description: 'T-shirt basique en coton bio. Coupe droite confortable.', prix: 5000, stock: 50, categorySlug: 'vetement', sousCatSlug: 'homme' },
            { nom: 'Robe d\'été fleurie', description: 'Robe légère à motifs floraux. Coupe évasée, tissu fluide et confortable.', prix: 18000, prixPromo: 14500, stock: 15, categorySlug: 'vetement', sousCatSlug: 'femme', enVedette: true },
            { nom: 'Blouse en soie bleue', description: 'Blouse élégante en soie, coupe loose. Parfaite pour le bureau ou une sortie.', prix: 22000, stock: 12, categorySlug: 'vetement', sousCatSlug: 'femme' },
            { nom: 'Jupe plissée midi', description: 'Jupe mi-longue plissée en tissu satiné. Taille élastiquée.', prix: 14000, stock: 18, categorySlug: 'vetement', sousCatSlug: 'femme' },
            { nom: 'Top crop brodé', description: 'Top court avec broderie artisanale. Style bohème chic.', prix: 9500, stock: 22, categorySlug: 'vetement', sousCatSlug: 'femme' },
            { nom: 'Ensemble enfant été', description: 'Ensemble short + t-shirt imprimé pour enfant. 100% coton doux.', prix: 7500, prixPromo: 5500, stock: 30, categorySlug: 'vetement', sousCatSlug: 'enfant' },
            { nom: 'Pyjama dinosaure enfant', description: 'Pyjama doux et confortable avec motifs dinosaures. Pour garçon 3-8 ans.', prix: 6000, stock: 25, categorySlug: 'vetement', sousCatSlug: 'enfant' },
            { nom: 'Baskets sport homme', description: 'Baskets légères et respirantes pour le sport et le quotidien. Semelle amortissante.', prix: 25000, prixPromo: 19000, stock: 18, categorySlug: 'chaussure', sousCatSlug: 'homme', enVedette: true },
            { nom: 'Mocassins cuir marron', description: 'Mocassins en cuir véritable, cousus main. Style élégant et confortable.', prix: 35000, stock: 10, categorySlug: 'chaussure', sousCatSlug: 'homme' },
            { nom: 'Sandales homme confort', description: 'Sandales ergonomiques avec soutien de la voûte plantaire. Semelle antidérapante.', prix: 12000, stock: 20, categorySlug: 'chaussure', sousCatSlug: 'homme' },
            { nom: 'Escarpins noirs élégants', description: 'Escarpins classiques en cuir noir. Talon 7cm, confort optimal.', prix: 28000, stock: 12, categorySlug: 'chaussure', sousCatSlug: 'femme', enVedette: true },
            { nom: 'Sneakers femme blanches', description: 'Sneakers tendance tout blanc, plateforme légère. Cuir synthétique premium.', prix: 20000, prixPromo: 16000, stock: 15, categorySlug: 'chaussure', sousCatSlug: 'femme' },
            { nom: 'Sandales à talons dorées', description: 'Sandales à talons fins avec brides dorées. Idéal pour les soirées.', prix: 22000, stock: 10, categorySlug: 'chaussure', sousCatSlug: 'femme' },
            { nom: 'Baskets enfant lumineuses', description: 'Baskets avec semelle lumineuse LED. Scratch facile, légères et fun.', prix: 10000, prixPromo: 7500, stock: 25, categorySlug: 'chaussure', sousCatSlug: 'enfant' },
            { nom: 'Montre classique homme', description: 'Montre analogique avec bracelet en cuir marron. Cadran minimaliste.', prix: 45000, prixPromo: 35000, stock: 8, categorySlug: 'accessoire', sousCatSlug: 'homme', enVedette: true },
            { nom: 'Ceinture cuir noir', description: 'Ceinture en cuir véritable avec boucle argentée. Taille ajustable.', prix: 8000, stock: 20, categorySlug: 'accessoire', sousCatSlug: 'homme' },
            { nom: 'Lunettes de soleil aviateur', description: 'Lunettes de soleil style aviateur. Protection UV400, monture dorée.', prix: 15000, stock: 15, categorySlug: 'accessoire', sousCatSlug: 'mixte' },
            { nom: 'Sac à main cuir beige', description: 'Sac à main en cuir synthétique de qualité. Compartiments multiples, bandoulière ajustable.', prix: 32000, prixPromo: 25000, stock: 10, categorySlug: 'accessoire', sousCatSlug: 'femme', enVedette: true },
            { nom: 'Boucles d\'oreilles perle', description: 'Boucles d\'oreilles pendantes avec perles de culture. Fermoir poussette sécurisé.', prix: 12000, stock: 20, categorySlug: 'accessoire', sousCatSlug: 'femme' },
            { nom: 'Écharpe en soie imprimée', description: 'Écharpe légère en soie avec imprimé floral. Dimensions 180x70cm.', prix: 18000, stock: 12, categorySlug: 'accessoire', sousCatSlug: 'femme' },
            { nom: 'Poulet entier fermier', description: 'Poulet fermier élevé en plein air. Environ 1.5kg, prêt à cuisiner.', prix: 4500, stock: 20, categorySlug: 'alimentation', enVedette: true },
            { nom: 'Filet de tilapia 1kg', description: 'Filets de tilapia frais, désarêtés. Poisson d\'eau douce de qualité.', prix: 5500, stock: 15, categorySlug: 'alimentation' },
            { nom: 'Tomates fraîches 1kg', description: 'Tomates bien mûres, cultivées localement. Parfaites pour les sauces.', prix: 800, stock: 40, categorySlug: 'alimentation' },
            { nom: 'Oignons rouges 2kg', description: 'Oignons rouges du terroir, saveur intense.', prix: 1200, stock: 35, categorySlug: 'alimentation' },
            { nom: 'Piment frais 500g', description: 'Piment frais local, récolté du jour. Assaisonnement parfait.', prix: 600, stock: 50, categorySlug: 'alimentation' },
            { nom: 'Bananes plantain 1kg', description: 'Bananes plantain mûres, idéales pour l\'alloco et les fritures.', prix: 1000, stock: 30, categorySlug: 'alimentation' },
            { nom: 'Igname pilée 2kg', description: 'Igname de qualité supérieure, prête pour le pilé ou le foufou.', prix: 2000, stock: 25, categorySlug: 'alimentation' },
            { nom: 'Gari blanc 5kg', description: 'Gari de manioc blanc, granulé fin. Base alimentaire traditionnelle.', prix: 2500, stock: 30, categorySlug: 'alimentation' },
            { nom: 'Riz au gras poulet', description: 'Riz au gras garni de poulet grillé, accompagné de légumes sautés et sauce.', prix: 3500, stock: 15, categorySlug: 'restauration', enVedette: true },
            { nom: 'Pâte rouge + poisson braisé', description: 'Pâte rouge traditionnelle avec poisson braisé assaisonné aux épices locales.', prix: 3000, stock: 12, categorySlug: 'restauration' },
            { nom: 'Alloco + poisson frit', description: 'Bananes plantain frites (alloco) servies avec poisson frit croustillant et piment.', prix: 2500, stock: 20, categorySlug: 'restauration' },
            { nom: 'Couscous garni', description: 'Couscous de semoule fine garni de viande, légumes variés et sauce tomate.', prix: 4000, stock: 10, categorySlug: 'restauration' },
            { nom: 'Salade composée complète', description: 'Salade fraîche avec laitue, tomates, maïs, thon, œuf et vinaigrette.', prix: 2500, stock: 15, categorySlug: 'restauration' },
            { nom: 'Jus de fruits naturel 1L', description: 'Jus 100% fruits pressés (ananas, mangue ou baobab). Sans sucre ajouté.', prix: 1500, prixPromo: 1000, stock: 30, categorySlug: 'restauration' },
            { nom: 'Crème hydratante karité', description: 'Crème corporelle au beurre de karité pur. Hydratation intense 24h, peau douce et nourrie.', prix: 8000, prixPromo: 6000, stock: 25, categorySlug: 'cosmetique', enVedette: true },
            { nom: 'Sérum visage vitamine C', description: 'Sérum éclaircissant à la vitamine C. Anti-taches, anti-âge, teint lumineux.', prix: 15000, stock: 15, categorySlug: 'cosmetique' },
            { nom: 'Shampoing naturel aloe vera', description: 'Shampoing doux à l\'aloe vera. Sans sulfate, pour cheveux naturels et traités.', prix: 5000, stock: 30, categorySlug: 'cosmetique' },
            { nom: 'Huile de coco vierge 250ml', description: 'Huile de coco vierge pressée à froid. Multi-usage : cheveux, peau, cuisine.', prix: 4000, stock: 35, categorySlug: 'cosmetique' },
            { nom: 'Kit maquillage complet', description: 'Kit de maquillage avec fond de teint, mascara, rouge à lèvres, fard à paupières et pinceaux.', prix: 25000, prixPromo: 20000, stock: 10, categorySlug: 'cosmetique', enVedette: true },
            { nom: 'Parfum homme boisé 100ml', description: 'Eau de parfum masculine aux notes boisées et épicées. Tenue longue durée.', prix: 18000, stock: 12, categorySlug: 'cosmetique' },
        ];
        for (const data of articles) {
            const cat = catMap[data.categorySlug];
            if (!cat)
                continue;
            const sousCategoryId = data.sousCatSlug ? getSousCatId(data.categorySlug, data.sousCatSlug) : null;
            await Article.updateOrCreate({ nom: data.nom, categoryId: cat.id }, {
                nom: data.nom,
                description: data.description,
                prix: data.prix,
                prixPromo: data.prixPromo || null,
                categoryId: cat.id,
                sousCategoryId: sousCategoryId,
                stock: data.stock,
                actif: true,
                enVedette: data.enVedette || false,
            });
        }
    }
}
//# sourceMappingURL=3_article_seeder.js.map