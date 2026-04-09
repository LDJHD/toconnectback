import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import { join } from 'path'
import { createReadStream, statSync } from 'fs'
import { lookup } from 'mime-types'

export default class StaticMiddleware {
  async handle({ request, response }: HttpContext, next: NextFn) {
    // Ne traiter que les requêtes GET
    if (request.method() !== 'GET') {
      return next()
    }

    // Vérifier si la requête commence par /pdfs
    if (!request.url().startsWith('/pdfs/')) {
      return next()
    }

    try {
      // Construire le chemin du fichier
      const filePath = join(process.cwd(), 'public', request.url())
      
      // Vérifier si le fichier existe et est accessible
      try {
        const stats = statSync(filePath)
        if (!stats.isFile()) {
          return next()
        }
      } catch (error) {
        return next()
      }

      // Obtenir le type MIME
      const mimeType = lookup(filePath) || 'application/octet-stream'
      
      // Définir les en-têtes de réponse
      response.header('Content-Type', mimeType)

      // Streamer le fichier
      return response.stream(createReadStream(filePath))

    } catch (error) {
      console.error('Erreur lors de la lecture du fichier:', error)
      return next()
    }
  }
} 