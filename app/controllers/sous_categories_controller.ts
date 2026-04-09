import type { HttpContext } from '@adonisjs/core/http'
import SousCategory from '#models/sous_category'
import { createSousCategoryValidator, updateSousCategoryValidator } from '#validators/sous_category_validator'

export default class SousCategoriesController {
  async index({ response }: HttpContext) {
    try {
      const sousCategories = await SousCategory.query().preload('category').orderBy('nom', 'asc')
      return response.ok(sousCategories)
    } catch (error) {
      return response.badRequest({ message: 'Erreur', error: error.message })
    }
  }

  async showByCategory({ params, response }: HttpContext) {
    try {
      const sousCategories = await SousCategory.query()
        .where('categoryId', params.categoryId)
        .preload('category')
        .orderBy('nom', 'asc')
      return response.ok(sousCategories)
    } catch (error) {
      return response.badRequest({ message: 'Erreur', error: error.message })
    }
  }

  async store({ request, response }: HttpContext) {
    try {
      const data = await request.validateUsing(createSousCategoryValidator)
      const slug = data.nom.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

      const sousCategory = await SousCategory.create({
        nom: data.nom,
        slug,
        categoryId: data.categoryId,
      })

      return response.created(sousCategory)
    } catch (error) {
      return response.badRequest({ message: 'Erreur lors de la création', error: error.message })
    }
  }

  async update({ params, request, response }: HttpContext) {
    try {
      const sousCategory = await SousCategory.findOrFail(params.id)
      const data = await request.validateUsing(updateSousCategoryValidator)

      if (data.nom) {
        sousCategory.nom = data.nom
        sousCategory.slug = data.nom.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
      }
      if (data.categoryId) sousCategory.categoryId = data.categoryId

      await sousCategory.save()
      return response.ok(sousCategory)
    } catch (error) {
      return response.badRequest({ message: 'Erreur lors de la mise à jour', error: error.message })
    }
  }

  async destroy({ params, response }: HttpContext) {
    try {
      const sousCategory = await SousCategory.findOrFail(params.id)
      await sousCategory.delete()
      return response.ok({ message: 'Sous-catégorie supprimée' })
    } catch (error) {
      return response.badRequest({ message: 'Erreur lors de la suppression', error: error.message })
    }
  }
}
