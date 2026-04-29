import Category from '#models/category';
import { createCategoryValidator, updateCategoryValidator } from '#validators/category_validator';
import app from '@adonisjs/core/services/app';
import { unlink } from 'node:fs/promises';
import { existsSync } from 'node:fs';
export default class CategoriesController {
    async index({ response }) {
        try {
            const categories = await Category.query()
                .where('actif', true)
                .preload('sousCategories')
                .withCount('articles')
                .orderBy('nom', 'asc');
            return response.ok(categories);
        }
        catch (error) {
            return response.badRequest({ message: 'Erreur lors de la récupération des catégories', error: error.message });
        }
    }
    async all({ response }) {
        try {
            const categories = await Category.query()
                .preload('sousCategories')
                .withCount('articles')
                .orderBy('nom', 'asc');
            return response.ok(categories);
        }
        catch (error) {
            return response.badRequest({ message: 'Erreur lors de la récupération des catégories', error: error.message });
        }
    }
    async show({ params, response }) {
        try {
            const category = await Category.query()
                .where('id', params.id)
                .preload('sousCategories')
                .preload('articles', (query) => {
                query.where('actif', true).preload('images').limit(20);
            })
                .firstOrFail();
            return response.ok(category);
        }
        catch (error) {
            return response.status(404).send({ message: 'Catégorie non trouvée' });
        }
    }
    async store({ request, response }) {
        try {
            const data = await request.validateUsing(createCategoryValidator);
            const slug = data.nom.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
            let imagePath = null;
            const imageFile = request.file('image', { size: '5mb', extnames: ['jpg', 'jpeg', 'png', 'webp'] });
            if (imageFile) {
                const fileName = `cat_${Date.now()}.${imageFile.extname}`;
                await imageFile.move(app.publicPath('uploads/categories'), { name: fileName });
                imagePath = `/uploads/categories/${fileName}`;
            }
            const category = await Category.create({
                nom: data.nom,
                slug,
                description: data.description || null,
                image: imagePath,
                actif: true,
            });
            return response.created(category);
        }
        catch (error) {
            return response.badRequest({ message: 'Erreur lors de la création de la catégorie', error: error.message });
        }
    }
    async update({ params, request, response }) {
        try {
            const category = await Category.findOrFail(params.id);
            const data = await request.validateUsing(updateCategoryValidator);
            if (data.nom) {
                category.nom = data.nom;
                category.slug = data.nom.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
            }
            if (data.description !== undefined)
                category.description = data.description || null;
            if (data.actif !== undefined)
                category.actif = data.actif;
            const imageFile = request.file('image', { size: '5mb', extnames: ['jpg', 'jpeg', 'png', 'webp'] });
            if (imageFile) {
                if (category.image) {
                    const oldPath = app.publicPath(category.image);
                    if (existsSync(oldPath))
                        await unlink(oldPath);
                }
                const fileName = `cat_${Date.now()}.${imageFile.extname}`;
                await imageFile.move(app.publicPath('uploads/categories'), { name: fileName });
                category.image = `/uploads/categories/${fileName}`;
            }
            await category.save();
            return response.ok(category);
        }
        catch (error) {
            return response.badRequest({ message: 'Erreur lors de la mise à jour', error: error.message });
        }
    }
    async destroy({ params, response }) {
        try {
            const category = await Category.findOrFail(params.id);
            if (category.image) {
                const filePath = app.publicPath(category.image);
                if (existsSync(filePath))
                    await unlink(filePath);
            }
            await category.delete();
            return response.ok({ message: 'Catégorie supprimée' });
        }
        catch (error) {
            return response.badRequest({ message: 'Erreur lors de la suppression', error: error.message });
        }
    }
}
//# sourceMappingURL=categories_controller.js.map