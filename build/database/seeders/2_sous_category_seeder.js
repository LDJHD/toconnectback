import { BaseSeeder } from '@adonisjs/lucid/seeders';
import Category from '#models/category';
import SousCategory from '#models/sous_category';
export default class SousCategorySeeder extends BaseSeeder {
    async run() {
        const vetement = await Category.findByOrFail('slug', 'vetement');
        const chaussure = await Category.findByOrFail('slug', 'chaussure');
        const accessoire = await Category.findByOrFail('slug', 'accessoire');
        const types = [
            { nom: 'Homme', slug: 'homme' },
            { nom: 'Femme', slug: 'femme' },
            { nom: 'Enfant', slug: 'enfant' },
            { nom: 'Mixte', slug: 'mixte' },
        ];
        for (const category of [vetement, chaussure, accessoire]) {
            for (const type of types) {
                await SousCategory.updateOrCreate({ slug: type.slug, categoryId: category.id }, { nom: type.nom, slug: type.slug, categoryId: category.id });
            }
        }
    }
}
//# sourceMappingURL=2_sous_category_seeder.js.map