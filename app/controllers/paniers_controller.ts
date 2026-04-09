import type { HttpContext } from '@adonisjs/core/http'
import Panier from '#models/panier'
import PanierItem from '#models/panier_item'
import Article from '#models/article'
import Pack from '#models/pack'
import { addPanierItemValidator, updatePanierItemValidator } from '#validators/panier_validator'

export default class PaniersController {
  async show({ params, response }: HttpContext) {
    try {
      let panier = await Panier.query()
        .where('sessionId', params.sessionId)
        .preload('items', (query) => {
          query.preload('article', (q) => q.preload('images'))
          query.preload('pack', (q) => q.preload('items', (qi) => qi.preload('article')))
        })
        .first()

      if (!panier) {
        panier = await Panier.create({ sessionId: params.sessionId })
        await panier.load('items')
      }

      const total = panier.items.reduce((sum, item) => sum + item.prixUnitaire * item.quantite, 0)

      return response.ok({ panier, total })
    } catch (error) {
      return response.badRequest({ message: 'Erreur', error: error.message })
    }
  }

  async addItem({ request, response }: HttpContext) {
    try {
      const data = await request.validateUsing(addPanierItemValidator)

      // Trouver ou créer le panier
      let panier = await Panier.findBy('sessionId', data.sessionId)
      if (!panier) {
        panier = await Panier.create({ sessionId: data.sessionId })
      }

      let prixUnitaire = 0
      if (data.articleId) {
        const article = await Article.findOrFail(data.articleId)
        prixUnitaire = article.prixPromo || article.prix

        // Vérifier si l'article est déjà dans le panier
        const existingItem = await PanierItem.query()
          .where('panierId', panier.id)
          .where('articleId', data.articleId)
          .first()

        if (existingItem) {
          existingItem.quantite += data.quantite
          await existingItem.save()
          await panier.load('items', (query) => {
            query.preload('article', (q) => q.preload('images'))
            query.preload('pack')
          })
          const total = panier.items.reduce((sum, item) => sum + item.prixUnitaire * item.quantite, 0)
          return response.ok({ panier, total })
        }
      } else if (data.packId) {
        const pack = await Pack.findOrFail(data.packId)
        prixUnitaire = pack.prixTotal
      } else {
        return response.badRequest({ message: 'articleId ou packId requis' })
      }

      await PanierItem.create({
        panierId: panier.id,
        articleId: data.articleId || null,
        packId: data.packId || null,
        quantite: data.quantite,
        prixUnitaire,
      })

      await panier.load('items', (query) => {
        query.preload('article', (q) => q.preload('images'))
        query.preload('pack')
      })
      const total = panier.items.reduce((sum, item) => sum + item.prixUnitaire * item.quantite, 0)

      return response.ok({ panier, total })
    } catch (error) {
      return response.badRequest({ message: 'Erreur lors de l\'ajout', error: error.message })
    }
  }

  async updateItem({ params, request, response }: HttpContext) {
    try {
      const data = await request.validateUsing(updatePanierItemValidator)
      const item = await PanierItem.findOrFail(params.itemId)
      item.quantite = data.quantite
      await item.save()

      const panier = await Panier.query()
        .where('id', item.panierId)
        .preload('items', (query) => {
          query.preload('article', (q) => q.preload('images'))
          query.preload('pack')
        })
        .firstOrFail()

      const total = panier.items.reduce((sum, i) => sum + i.prixUnitaire * i.quantite, 0)

      return response.ok({ panier, total })
    } catch (error) {
      return response.badRequest({ message: 'Erreur', error: error.message })
    }
  }

  async removeItem({ params, response }: HttpContext) {
    try {
      const item = await PanierItem.findOrFail(params.itemId)
      const panierId = item.panierId
      await item.delete()

      const panier = await Panier.query()
        .where('id', panierId)
        .preload('items', (query) => {
          query.preload('article', (q) => q.preload('images'))
          query.preload('pack')
        })
        .firstOrFail()

      const total = panier.items.reduce((sum, i) => sum + i.prixUnitaire * i.quantite, 0)

      return response.ok({ panier, total })
    } catch (error) {
      return response.badRequest({ message: 'Erreur', error: error.message })
    }
  }

  async clear({ params, response }: HttpContext) {
    try {
      const panier = await Panier.findByOrFail('sessionId', params.sessionId)
      await PanierItem.query().where('panierId', panier.id).delete()

      await panier.load('items')
      return response.ok({ panier, total: 0 })
    } catch (error) {
      return response.badRequest({ message: 'Erreur', error: error.message })
    }
  }
}
