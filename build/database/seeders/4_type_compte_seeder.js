import { BaseSeeder } from '@adonisjs/lucid/seeders';
import TypeCompte from '#models/type_compte';
export default class TypeCompteSeeder extends BaseSeeder {
    async run() {
        await TypeCompte.updateOrCreateMany('nom', [
            {
                nom: 'Netflix Standard',
                prix: 4000,
                nombreEcran: 2,
                plateforme: 'Netflix',
                description: 'Profitez de Netflix en HD sur 2 écrans simultanés. Accès complet au catalogue films et séries.',
                composition: 'standard',
            },
            {
                nom: 'Netflix Premium',
                prix: 6000,
                nombreEcran: 4,
                plateforme: 'Netflix',
                description: 'Netflix en Ultra HD 4K sur 4 écrans. Qualité maximale et téléchargements illimités.',
                composition: 'premium',
            },
            {
                nom: 'Prime Video Standard',
                prix: 3000,
                nombreEcran: 3,
                plateforme: 'Prime Video',
                description: 'Accédez à tout le catalogue Amazon Prime Video. Films, séries et contenus exclusifs.',
                composition: 'standard',
            },
            {
                nom: 'Prime Video Premium',
                prix: 5000,
                nombreEcran: 5,
                plateforme: 'Prime Video',
                description: 'Prime Video avec tous les canaux premium inclus. 5 écrans simultanés.',
                composition: 'premium',
            },
            {
                nom: 'Spotify Individual',
                prix: 2000,
                nombreEcran: 1,
                plateforme: 'Spotify',
                description: 'Spotify Premium pour 1 compte. Musique sans pub, téléchargement hors ligne.',
                composition: 'individual',
            },
            {
                nom: 'Spotify Duo',
                prix: 3500,
                nombreEcran: 2,
                plateforme: 'Spotify',
                description: 'Spotify Premium pour 2 comptes. Parfait pour les couples.',
                composition: 'duo',
            },
            {
                nom: 'Spotify Famille',
                prix: 5000,
                nombreEcran: 6,
                plateforme: 'Spotify',
                description: 'Spotify Premium pour 6 comptes. Idéal pour toute la famille.',
                composition: 'famille',
            },
            {
                nom: 'Disney+ Standard',
                prix: 3500,
                nombreEcran: 2,
                plateforme: 'Disney+',
                description: 'Disney+, Marvel, Star Wars, Pixar et National Geographic. 2 écrans HD.',
                composition: 'standard',
            },
            {
                nom: 'Disney+ Premium',
                prix: 5500,
                nombreEcran: 4,
                plateforme: 'Disney+',
                description: 'Disney+ en 4K Ultra HD. 4 écrans avec téléchargements sur 10 appareils.',
                composition: 'premium',
            },
            {
                nom: 'GogoFlix Basic',
                prix: 1500,
                nombreEcran: 1,
                plateforme: 'GogoFlix',
                description: 'Accès au catalogue GogoFlix. Films africains, séries locales et contenus exclusifs.',
                composition: 'basic',
            },
            {
                nom: 'GogoFlix Premium',
                prix: 3000,
                nombreEcran: 3,
                plateforme: 'GogoFlix',
                description: 'GogoFlix Premium avec contenus exclusifs et 3 écrans simultanés. HD inclus.',
                composition: 'premium',
            },
        ]);
    }
}
//# sourceMappingURL=4_type_compte_seeder.js.map