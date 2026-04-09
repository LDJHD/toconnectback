import type { HttpContext } from '@adonisjs/core/http'
import Article from '#models/article'
import ArticleImage from '#models/article_image'
import { createArticleValidator, updateArticleValidator } from '#validators/article_validator'
import app from '@adonisjs/core/services/app'
import { unlink } from 'node:fs/promises'
import { existsSync } from 'node:fs'

export default class ArticlesController {
  async index({ request, response }: HttpContext) {
    try {
      const page = request.input('page', 1)
      const limit = request.input('limit', 20)
      const categoryId = request.input('category_id')
      const sousCategoryId = request.input('sous_category_id')
      const prixMin = request.input('prix_min')
      const prixMax = request.input('prix_max')
      const search = request.input('search')
      const tri = request.input('tri', 'recent') // recent, prix_asc, prix_desc, nom

      let query = Article.query().where('actif', true).preload('images').preload('category').preload('sousCategory')

      if (categoryId) query = query.where('categoryId', categoryId)
      if (sousCategoryId) query = query.where('sousCategoryId', sousCategoryId)
      if (prixMin) query = query.where('prix', '>=', prixMin)
      if (prixMax) query = query.where('prix', '<=', prixMax)
      if (search) {
        query = query.where((q) => {
          q.whereILike('nom', `%${search}%`).orWhereILike('description', `%${search}%`)
        })
      }

      switch (tri) {
        case 'prix_asc': query = query.orderBy('prix', 'asc'); break
        case 'prix_desc': query = query.orderBy('prix', 'desc'); break
        case 'nom': query = query.orderBy('nom', 'asc'); break
        default: query = query.orderBy('createdAt', 'desc')
      }

      const articles = await query.paginate(page, limit)
      return response.ok(articles)
    } catch (error) {
      return response.badRequest({ message: 'Erreur lors de la récupération des articles', error: error.message })
    }
  }

  async allAdmin({ request, response }: HttpContext) {
    try {
      const page = request.input('page', 1)
      const limit = request.input('limit', 20)
      const search = request.input('search')

      let query = Article.query().preload('images').preload('category').preload('sousCategory')

      if (search) {
        query = query.where((q) => {
          q.whereILike('nom', `%${search}%`).orWhereILike('description', `%${search}%`)
        })
      }

      const articles = await query.orderBy('createdAt', 'desc').paginate(page, limit)
      return response.ok(articles)
    } catch (error) {
      return response.badRequest({ message: 'Erreur', error: error.message })
    }
  }

  async show({ params, response }: HttpContext) {
    try {
      const article = await Article.query()
        .where('id', params.id)
        .preload('images')
        .preload('category')
        .preload('sousCategory')
        .firstOrFail()

      // Articles similaires (même catégorie)
      const similaires = await Article.query()
        .where('categoryId', article.categoryId)
        .where('actif', true)
        .whereNot('id', article.id)
        .preload('images')
        .limit(8)

      return response.ok({ article, similaires })
    } catch (error) {
      return response.status(404).send({ message: 'Article non trouvé' })
    }
  }

  async byCategory({ params, request, response }: HttpContext) {
    try {
      const page = request.input('page', 1)
      const limit = request.input('limit', 20)
      const sousCategoryId = request.input('sous_category_id')
      const prixMin = request.input('prix_min')
      const prixMax = request.input('prix_max')
      const tri = request.input('tri', 'recent')

      let query = Article.query()
        .where('categoryId', params.categoryId)
        .where('actif', true)
        .preload('images')
        .preload('sousCategory')

      if (sousCategoryId) query = query.where('sousCategoryId', sousCategoryId)
      if (prixMin) query = query.where('prix', '>=', prixMin)
      if (prixMax) query = query.where('prix', '<=', prixMax)

      switch (tri) {
        case 'prix_asc': query = query.orderBy('prix', 'asc'); break
        case 'prix_desc': query = query.orderBy('prix', 'desc'); break
        case 'nom': query = query.orderBy('nom', 'asc'); break
        default: query = query.orderBy('createdAt', 'desc')
      }

      const articles = await query.paginate(page, limit)
      return response.ok(articles)
    } catch (error) {
      return response.badRequest({ message: 'Erreur', error: error.message })
    }
  }

  async featured({ response }: HttpContext) {
    try {
      const articles = await Article.query()
        .where('actif', true)
        .where('enVedette', true)
        .preload('images')
        .preload('category')
        .orderBy('createdAt', 'desc')
        .limit(12)

      return response.ok(articles)
    } catch (error) {
      return response.badRequest({ message: 'Erreur', error: error.message })
    }
  }

  async search({ request, response }: HttpContext) {
    try {
      const query = request.input('query', '')
      const page = request.input('page', 1)
      const limit = request.input('limit', 20)

      if (!query || query.length < 2) {
        return response.badRequest({ message: 'La recherche doit contenir au moins 2 caractères' })
      }

      const articles = await Article.query()
        .where('actif', true)
        .where((q) => {
          q.whereILike('nom', `%${query}%`)
            .orWhereILike('description', `%${query}%`)
        })
        .preload('images')
        .preload('category')
        .preload('sousCategory')
        .orderBy('createdAt', 'desc')
        .paginate(page, limit)

      return response.ok(articles)
    } catch (error) {
      return response.badRequest({ message: 'Erreur lors de la recherche', error: error.message })
    }
  }

  async store({ request, response }: HttpContext) {
    try {
      const data = await request.validateUsing(createArticleValidator)

      const article = await Article.create({
        nom: data.nom,
        description: data.description || null,
        prix: data.prix,
        prixPromo: data.prixPromo || null,
        categoryId: data.categoryId,
        sousCategoryId: data.sousCategoryId || null,
        stock: data.stock,
        actif: true,
        enVedette: data.enVedette || false,
      })

      // Gestion des images multiples
      const images = request.files('images', { size: '5mb', extnames: ['jpg', 'jpeg', 'png', 'webp'] })
      for (let i = 0; i < images.length; i++) {
        const file = images[i]
        const fileName = `art_${article.id}_${Date.now()}_${i}.${file.extname}`
        await file.move(app.publicPath('uploads/articles'), { name: fileName })
        await ArticleImage.create({
          articleId: article.id,
          imageUrl: `/uploads/articles/${fileName}`,
          principal: i === 0,
          ordre: i,
        })
      }

      await article.load('images')
      await article.load('category')
      return response.created(article)
    } catch (error) {
      return response.badRequest({ message: 'Erreur lors de la création', error: error.message })
    }
  }

  async update({ params, request, response }: HttpContext) {
    try {
      const article = await Article.findOrFail(params.id)
      const data = await request.validateUsing(updateArticleValidator)

      if (data.nom !== undefined) article.nom = data.nom
      if (data.description !== undefined) article.description = data.description || null
      if (data.prix !== undefined) article.prix = data.prix
      if (data.prixPromo !== undefined) article.prixPromo = data.prixPromo || null
      if (data.categoryId !== undefined) article.categoryId = data.categoryId
      if (data.sousCategoryId !== undefined) article.sousCategoryId = data.sousCategoryId || null
      if (data.stock !== undefined) article.stock = data.stock
      if (data.actif !== undefined) article.actif = data.actif
      if (data.enVedette !== undefined) article.enVedette = data.enVedette

      // Nouvelles images
      const images = request.files('images', { size: '5mb', extnames: ['jpg', 'jpeg', 'png', 'webp'] })
      if (images.length > 0) {
        const existingImages = await ArticleImage.query().where('articleId', article.id)
        const count = existingImages.length

        for (let i = 0; i < images.length; i++) {
          const file = images[i]
          const fileName = `art_${article.id}_${Date.now()}_${i}.${file.extname}`
          await file.move(app.publicPath('uploads/articles'), { name: fileName })
          await ArticleImage.create({
            articleId: article.id,
            imageUrl: `/uploads/articles/${fileName}`,
            principal: count === 0 && i === 0,
            ordre: count + i,
          })
        }
      }

      await article.save()
      await article.load('images')
      await article.load('category')
      return response.ok(article)
    } catch (error) {
      return response.badRequest({ message: 'Erreur lors de la mise à jour', error: error.message })
    }
  }

  async deleteImage({ params, response }: HttpContext) {
    try {
      const image = await ArticleImage.findOrFail(params.imageId)
      const filePath = app.publicPath(image.imageUrl)
      if (existsSync(filePath)) await unlink(filePath)
      await image.delete()
      return response.ok({ message: 'Image supprimée' })
    } catch (error) {
      return response.badRequest({ message: 'Erreur', error: error.message })
    }
  }

  async destroy({ params, response }: HttpContext) {
    try {
      const article = await Article.findOrFail(params.id)
      const images = await ArticleImage.query().where('articleId', article.id)
      for (const img of images) {
        const filePath = app.publicPath(img.imageUrl)
        if (existsSync(filePath)) await unlink(filePath)
      }
      await article.delete()
      return response.ok({ message: 'Article supprimé' })
    } catch (error) {
      return response.badRequest({ message: 'Erreur lors de la suppression', error: error.message })
    }
  }
}
