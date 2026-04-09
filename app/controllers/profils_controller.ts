import Profil from '#models/profil'
import { ProfilCreateValidator, ProfilUpdateValidator } from '#validators/profil'
import { HttpContext } from '@adonisjs/core/http'


export default class ProfilsController {
  // Récupérer tous les profils
  async index({ response }: HttpContext) {
    const profils = await Profil.all()
    return response.ok(profils)
  }

  // Créer un nouveau profil
  async store({ request, response }: HttpContext) {
    try {
      // Validation des données de la requête selon le ProfilCreateValidator
      const data = await request.validateUsing(ProfilCreateValidator)
      // Vérifier si un profil avec le même nom et pin existe déjà pour ce compte
      const profilExistant = await Profil.query()
        .where('compteId', data.compteId)
        .where('nomProfil', data.nomProfil)
        .where('pin', data.pin)
        .first()

      if (profilExistant) {
        return response.badRequest({
          message: 'Un profil avec le même nom et PIN existe déjà pour ce compte'
        })
      }

      // Création du profil avec les données validées
      const profil = await Profil.create(data)

      return response.created(profil)
    } catch (error) {
      return response.badRequest({ message: error.messages || 'Erreur lors de la création du profil' })
    }
  }

  // Récupérer un profil spécifique
  async show({ params, response }: HttpContext) {
    try {
      const profil = await Profil.findOrFail(params.id)
      return response.ok(profil)
    } catch (error) {
      return response.notFound({ message: 'Profil non trouvé' })
    }
  }

  // Mettre à jour un profil existant
  async update({ params, request, response }: HttpContext) {
    try {
      // Trouver le profil à mettre à jour
      const profil = await Profil.findOrFail(params.id)

      // Validation des données de la requête selon le ProfilUpdateValidator
      const data = await request.validateUsing(ProfilUpdateValidator)

      // Fusionner les données validées avec les données existantes
      profil.merge(data)

      // Sauvegarder le profil mis à jour
      await profil.save()

      return response.ok(profil)
    } catch (error) {
      return response.badRequest({ message: error.messages || 'Erreur lors de la mise à jour du profil' })
    }
  }

  // Supprimer un profil
  async destroy({ params, response }: HttpContext) {
    try {
      const profil = await Profil.findOrFail(params.id)
      await profil.delete()

      return response.ok({ message: 'Profil supprimé avec succès' })
    } catch (error) {
      return response.notFound({ message: 'Profil non trouvé' })
    }
  }
}
