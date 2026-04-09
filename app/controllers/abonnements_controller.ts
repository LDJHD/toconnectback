import { HttpContext } from '@adonisjs/core/http'
import Abonnement from '#models/abonnement'
import Compte from '#models/compte'
import Profil from '#models/profil'
import Utilisateur from '#models/utilisateur'
import Notification from '#models/notification'
import { DateTime } from 'luxon'
import { AbonnementCreateValidator, AbonnementUpdateValidator } from '#validators/abonnement'
import { generatePdf, sendSms } from '#services/helpers'
import { UtilisateurCreateValidator } from '#validators/utilisateur'
import { sendEmail } from '#services/mail_service'
import db from '@adonisjs/lucid/services/db'
import type { TransactionClientContract } from '@adonisjs/lucid/types/database'
import HistoriqueAbonnement from '#models/historique_abonnement'

// Définition des interfaces pour le typage
interface AbonnementPayload {
  typeCompteId: number
  plateforme: string
  nom: string
  email: string
  telephone: string
  prix: number
  montant: number
  duree: number
  composition?: string
  nbEcran: number
  compteId: number
  id: number
}

export default class AbonnementsController {
  async index({ response }: HttpContext) {
    try {
      const abonnements = await Abonnement.query()
        .preload('utilisateur')
        .preload('compte')
        .preload('typecompte')

      return response.ok({ message: 'Abonnements récupérés avec succès', data: abonnements })
    } catch (error) {
      return response.status(500).send({ error: 'Erreur lors de la récupération des abonnements' })
    }
  }

  // async store({ request, response }: HttpContext) {
  //   try {
  //     // Validation des données
  //     const payload = await request.validateUsing(AbonnementCreateValidator)

  //     // ✅ Conversion des dates JS en DateTime d'AdonisJS
  //     const abonnement = await Abonnement.create({
  //       ...payload,
  //       dateDebut: DateTime.fromJSDate(new Date(payload.dateDebut)),
  //       dateFin: DateTime.fromJSDate(new Date(payload.dateFin)),
  //     })

  //     return response.created({ message: 'Abonnement créé avec succès', data: abonnement })
  //   } catch (error) {
  //     return response.status(400).send({
  //       error: 'Erreur lors de la création de l\'abonnement',
  //       details: error.messages || 'Données invalides'
  //     })
  //   }
  // }

  async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(AbonnementCreateValidator) as AbonnementPayload

    if ((payload.montant) < (payload.prix)) {
      return response.status(400).json({
        message: "Le montant payé est inférieur au prix de l'abonnement"
      })
    }

    try {
      const result = await db.transaction(async (trx: TransactionClientContract) => {
        const payloaduser = await request.validateUsing(UtilisateurCreateValidator)
        let utilisateur = await Utilisateur.findBy('email', payloaduser.email)
        if (!utilisateur) {
          utilisateur = await Utilisateur.create({
            nom: payloaduser.nom,
            email: payloaduser.email,
            telephone: payloaduser.telephone,
          }, { client: trx })
        }

        // Si c'est un pack, traiter chaque plateforme de la composition
        if (payload.plateforme === 'pack') {
          if (!payload.composition) {
            throw new Error('La composition est requise pour les packs')
          }

          const plateformes = payload.composition.split(',').map((p: string) => p.trim())
          const abonnementsPack = []
          const comptesPack = []
          const profilsPack = []

          for (const plateforme of plateformes) {
            // Récupérer les comptes disponibles pour la plateforme actuelle
            const comptes = await Compte.query({ client: trx })
              .where('plateforme', plateforme)
              .where('nbUtilisateurs', '<', 8)
              .orderBy('nbUtilisateurs', 'asc')

            if (comptes.length === 0) {
              throw new Error(`Aucun compte disponible pour la plateforme ${plateforme}`)
            }

            let compteChoisi = null
            let profilChoisi = null

            // Parcourir les comptes jusqu'à trouver un profil disponible
            for (const compte of comptes) {
              const profils = await Profil.query({ client: trx })
                .where('compteId', compte.id)
                .where('nbAbonnes', '<', 2)
                .orderBy('nbAbonnes', 'asc')

              if (profils.length > 0) {
                compteChoisi = compte
                profilChoisi = profils[0]
                break
              }
            }

            if (!compteChoisi || !profilChoisi) {
              throw new Error(`Aucun profil disponible pour la plateforme ${plateforme}`)
            }

            // Mettre à jour le nombre d'utilisateurs et d'abonnés
            const nbEcran = payload.nbEcran ? parseInt(payload.nbEcran.toString()) : 1
            compteChoisi.merge({ nbUtilisateurs: compteChoisi.nbUtilisateurs + nbEcran })
            await compteChoisi.save()

            profilChoisi.merge({ nbAbonnes: profilChoisi.nbAbonnes + 1 })
            await profilChoisi.save()

            // Créer l'abonnement pour cette plateforme
            const newAbonnement = await Abonnement.create({
              utilisateurId: utilisateur.id,
              compteId: compteChoisi.id,
              profilId: profilChoisi.id,
              typeCompteId: payload.typeCompteId,
              dateDebut: DateTime.now(),
              dateFin: DateTime.now().plus({ days: (payload.duree || 1) * 30 }),
              inactif: false,
              fin: false
            }, { client: trx })

            // Créer l'entrée dans l'historique pour ce nouvel abonnement
            await HistoriqueAbonnement.create({
              utilisateurId: utilisateur.id,
              compteId: compteChoisi.id,
              profilId: profilChoisi.id,
              typeCompteId: payload.typeCompteId,
              dateDebut: DateTime.now(),
              dateFin: DateTime.now().plus({ days: (payload.duree || 1) * 30 }),
              inactif: false,
              fin: false
            }, { client: trx })

            abonnementsPack.push(newAbonnement)
            comptesPack.push(compteChoisi)
            profilsPack.push(profilChoisi)
          }

          return { 
            abonnements: abonnementsPack, 
            utilisateur, 
            comptes: comptesPack, 
            profils: profilsPack,
            isPack: true 
          }
        }

        // Traitement normal pour une plateforme unique
        const comptes = await Compte.query({ client: trx })
          .where('plateforme', payload.plateforme || '')
          .where('nbUtilisateurs', '<', 8)
          .orderBy('nbUtilisateurs', 'asc')

        if (comptes.length === 0) {
          throw new Error('Aucun compte disponible pour cette plateforme.')
        }

        let compteChoisi = null
        let profilChoisi = null

        for (const compte of comptes) {
          const profils = await Profil.query({ client: trx })
            .where('compteId', compte.id)
            .where('nbAbonnes', '<', 2)
            .orderBy('nbAbonnes', 'asc')

          if (profils.length > 0) {
            compteChoisi = compte
            profilChoisi = profils[0]
            break
          }
        }

        if (!compteChoisi || !profilChoisi) {
          throw new Error('Aucun profil disponible dans tous les comptes vérifiés.')
        }

        const nbEcran = payload.nbEcran ? parseInt(payload.nbEcran.toString()) : 1
        compteChoisi.merge({ nbUtilisateurs: compteChoisi.nbUtilisateurs + nbEcran })
        await compteChoisi.save()

        profilChoisi.merge({ nbAbonnes: profilChoisi.nbAbonnes + 1 })
        await profilChoisi.save()

        const newAbonnement = await Abonnement.create({
          utilisateurId: utilisateur.id,
          compteId: compteChoisi.id,
          profilId: profilChoisi.id,
          typeCompteId: payload.typeCompteId,
          dateDebut: DateTime.now(),
          dateFin: DateTime.now().plus({ days: (payload.duree || 1) * 30 }),
          inactif: false,
          fin: false
        }, { client: trx })

        // Créer l'entrée dans l'historique pour ce nouvel abonnement
        await HistoriqueAbonnement.create({
          utilisateurId: utilisateur.id,
          compteId: compteChoisi.id,
          profilId: profilChoisi.id,
          typeCompteId: payload.typeCompteId,
          dateDebut: DateTime.now(),
          dateFin: DateTime.now().plus({ days: (payload.duree || 1) * 30 }),
          inactif: false,
          fin: false
        }, { client: trx })

        return { 
          abonnements: [newAbonnement], 
          utilisateur, 
          comptes: [compteChoisi], 
          profils: [profilChoisi],
          isPack: false 
        }
      })

      const abonnement = result.abonnements[0]
      const utilisateur = result.utilisateur

      // Génération du PDF avec les détails
      let pdfPath = null
      try {
        if (result.isPack) {
          // Générer un PDF pour le pack avec tous les comptes
          pdfPath = await generatePdf(
            utilisateur,
            result.comptes,
            result.profils,
            result.abonnements
          )
        } else {
          // Générer un PDF pour un seul compte
          pdfPath = await generatePdf(
            utilisateur,
            result.comptes[0],
            result.profils[0],
            abonnement
          )
        }
      } catch (error) {
        console.error('Erreur lors de la génération du PDF:', error)
      }

      // Envoi des informations par email
      try {
        if (result.isPack) {
          // Créer le contenu HTML pour le pack
          const contenuPack = result.comptes.map((compte, index) => `
            <div style="margin-bottom: 20px; padding: 10px; border: 1px solid #ddd;">
              <h3>${compte.plateforme}</h3>
              <p>Compte: ${compte.emailCompte}</p>
              <p>Profil: ${result.profils[index].nomProfil}</p>
              <p>PIN: ${result.profils[index].pin}</p>
              <p>Date de fin: ${result.abonnements[index].dateFin.toFormat('dd/MM/yyyy')}</p>
            </div>
          `).join('')

          await sendEmail(
            utilisateur.email,
            'Détails de votre pack d\'abonnements',
            `<p>Bonjour ${utilisateur.nom},</p>
            <p>Votre pack d'abonnements a été créé avec succès.</p>
            ${contenuPack}
            <p>Cordialement,</p>
            <p>Supermarché</p>`
          )
        } else {
          await sendEmail(
            utilisateur.email,
            'Détails de votre abonnement',
            `<p>Bonjour ${utilisateur.nom},</p>
            <p>Votre abonnement a été créé avec succès.</p>
            <p>Compte: ${result.comptes[0].emailCompte}</p>
            <p>Profil: ${result.profils[0].nomProfil}</p>
            <p>PIN: ${result.profils[0].pin}</p>
            <p>Date de fin: ${result.abonnements[0].dateFin.toFormat('dd/MM/yyyy')}</p>
            <p>Cordialement,</p>
            <p>Supermarché</p>`
          )
        }
      } catch (error) {
        console.error('Erreur lors de l\'envoi de l\'email:', error)
      }

      // Envoi des informations par SMS (WhatsApp)
      try {
        if (result.isPack) {
          // Envoyer un SMS pour chaque compte du pack
          for (let i = 0; i < result.comptes.length; i++) {
            await sendSms(
              utilisateur.telephone,
              result.comptes[i],
              result.profils[i]
            )
          }
        } else {
          await sendSms(
            utilisateur.telephone,
            result.comptes[0],
            result.profils[0]
          )
        }
      } catch (error) {
        console.error('Erreur lors de l\'envoi du SMS:', error)
      }

      // Créer la notification
      let notificationMessage = `Félicitations ${utilisateur.nom}, votre abonnement a été effectué avec succès le ${DateTime.now().toFormat('dd/MM/yyyy à HH:mm')}.\n\n`
      
      if (result.isPack) {
        notificationMessage += 'Vos comptes :\n'
        result.comptes.forEach((compte, index) => {
          notificationMessage += `\n${compte.plateforme}:\n`
          notificationMessage += `Email: ${compte.emailCompte}\n`
          notificationMessage += `Mot de passe: ${compte.motDePasse}\n`
          notificationMessage += `Profil: ${result.profils[index].nomProfil}\n`
          notificationMessage += `PIN: ${result.profils[index].pin}\n`
          notificationMessage += `Date de début: ${result.abonnements[index].dateDebut.toFormat('dd/MM/yyyy')}\n`
          notificationMessage += `Date de fin: ${result.abonnements[index].dateFin.toFormat('dd/MM/yyyy')}\n`
        })
      } else {
        notificationMessage += `\nCompte: ${result.comptes[0].emailCompte}\n`
        notificationMessage += `Mot de passe: ${result.comptes[0].motDePasse}\n`
        notificationMessage += `Profil: ${result.profils[0].nomProfil}\n`
        notificationMessage += `PIN: ${result.profils[0].pin}\n`
        notificationMessage += `Date de début: ${result.abonnements[0].dateDebut.toFormat('dd/MM/yyyy')}\n`
        notificationMessage += `Date de fin: ${result.abonnements[0].dateFin.toFormat('dd/MM/yyyy')}\n`
      }

      const notification = await Notification.create({
        message: notificationMessage,
        utilisateurId: utilisateur.id
      })

      // Réponse au frontend avec indication des erreurs éventuelles
      const response_data: any = {
        message: result.isPack ? 'Pack d\'abonnements créé avec succès' : 'Abonnement créé avec succès',
        data: {
          abonnements: result.abonnements,
          comptes: result.comptes.map(compte => ({
            email: compte.emailCompte,
            motDePasse: compte.motDePasse
          })),
          profils: result.profils.map(profil => ({
            nom: profil.nomProfil,
            pin: profil.pin
          }))
        },
        warnings: []
      }

      if (pdfPath) {
        response_data.data.pdf = pdfPath
        // Mettre à jour la notification avec le lien du PDF
        await notification.merge({
          message: notification.message + `\n\nVous pouvez télécharger le PDF de vos informations en cliquant ici : ${pdfPath}`
        })
        await notification.save()
      } else {
        response_data.warnings.push('Le PDF n\'a pas pu être généré')
      }

      return response.created(response_data)
    } catch (error) {
      return response.status(400).send({
        error: 'Erreur lors de la création de l\'abonnement',
        details: error.message || 'Données invalides'
      })
    }
  }

  async show({ params, response }: HttpContext) {
    try {
      const abonnement = await Abonnement.query()
        .where('id', params.id)
        .preload('utilisateur')
        .preload('compte')
        .preload('typecompte')
        .firstOrFail()

      return response.ok({ message: 'Abonnement trouvé', data: abonnement })
    } catch (error) {
      return response.status(404).send({ error: 'Abonnement introuvable' })
    }
  }

  async showByAbonnement({ params, response }: HttpContext) {
    try {
      // Récupérer d'abord l'abonnement sélectionné pour obtenir sa date de début
      const abonnementSelectionne = await Abonnement.query()
        .where('id', params.id)
        .preload('utilisateur')
        .preload('compte')
        .preload('typecompte')
        .firstOrFail()

      if (!abonnementSelectionne.dateDebut) {
        return response.status(400).send({ error: 'La date de début de l\'abonnement n\'est pas définie' })
      }

      const dateDebut = abonnementSelectionne.dateDebut.toISO() as string

      // Récupérer tous les abonnements de l'utilisateur avec la même date de début exacte
      const abonnements = await Abonnement.query()
        .where('utilisateurId', abonnementSelectionne.utilisateurId)
        .where('dateDebut', dateDebut)
        .preload('utilisateur')
        .preload('compte')
        .preload('typecompte')

      return response.ok({ 
        message: 'Abonnements trouvés', 
        data: {
          abonnementSelectionne,
          abonnementsSimultanes: abonnements
        }
      })
    } catch (error) {
      return response.status(404).send({ error: 'Abonnement introuvable' })
    }
  }

  async update({ params, request, response }: HttpContext) {
    try {
      const abonnement = await Abonnement.findOrFail(params.id)
      
      // Validation des données
      const payload = await request.validateUsing(AbonnementUpdateValidator)

      // Mise à jour de l'abonnement
      if (payload.duree) {
        abonnement.dateFin = DateTime.now().plus({ days: payload.duree * 30 })
      }
      
      await abonnement.save()

      return response.ok({ message: 'Abonnement mis à jour avec succès', data: abonnement })
    } catch (error) {
      return response.status(400).send({
        error: 'Erreur lors de la mise à jour de l\'abonnement',
        details: error.messages || 'Données invalides'
      })
    }
  }

  async destroy({ params, response }: HttpContext) {
    try {
      const abonnement = await Abonnement.findOrFail(params.id)
      await abonnement.delete()

      return response.ok({ message: 'Abonnement supprimé avec succès' })
    } catch (error) {
      return response.status(404).send({ error: 'Abonnement introuvable' })
    }
  }
  async terminerAbonnement({ params, response }: HttpContext) {
    try {
      const abonnement = await Abonnement.findOrFail(params.id)
      abonnement.merge({ fin: true })
      await abonnement.save()

      // ✅ Envoi d'email de confirmation
      await sendEmail(
        abonnement.utilisateur.email,
        'Fin de votre abonnement',
        `<p>Bonjour ${abonnement.utilisateur.nom},</p>
        <p>Votre abonnement est terminé.</p>
        <p>Nous espérons vous revoir bientôt !</p>
        <p>Cordialement,</p>
        <p>Supermarché</p>`
      )

      return response.ok({ message: 'Abonnement terminé avec succès' })
    } catch (error) {
      return response.status(400).send({ error: 'Erreur lors de la terminaison de l\'abonnement' })
    }
  }

  async relancerAbonnement({ request, response }: HttpContext) {
    const payload = await request.validateUsing(AbonnementCreateValidator) as AbonnementPayload

    if (!payload.id) {
      return response.status(400).json({
        message: "L'ID de l'abonnement est requis"
      })
    }

    if (payload.montant < payload.prix) {
      return response.status(400).json({
        message: "Le montant payé est inférieur au prix de l'abonnement"
      })
    }

    try {
      const result = await db.transaction(async (trx: TransactionClientContract) => {
        // Récupérer l'abonnement initial pour obtenir les informations de base
        const abonnementInitial = await Abonnement.query({ client: trx })
          .where('id', payload.id)
          .preload('compte')
          .preload('profil')
          .preload('utilisateur')
          .first()

        if (!abonnementInitial) {
          throw new Error('Abonnement non trouvé')
        }

        // Déterminer si c'est un pack
        const isPack = payload.plateforme === 'pack'
        let abonnementsAReabonner = [abonnementInitial]

        if (isPack) {
          if (!abonnementInitial.createdAt) {
            throw new Error('La date de création de l\'abonnement n\'est pas définie')
          }

          const createdAt = abonnementInitial.createdAt.toFormat('yyyy-MM-dd HH:mm:ss')

          // Récupérer tous les abonnements créés au même moment pour le même utilisateur
          const abonnementsPack = await Abonnement.query({ client: trx })
            .where('utilisateurId', abonnementInitial.utilisateurId)
            .where('createdAt', createdAt)
            .preload('compte')
            .preload('profil')
            .preload('utilisateur')

          if (abonnementsPack.length === 0) {
            throw new Error('Aucun abonnement pack trouvé')
          }

          abonnementsAReabonner = abonnementsPack
        }

        const now = DateTime.now()
        const abonnementsMisAJour = []

        for (const abonnement of abonnementsAReabonner) {
          // Vérifier le nombre d'utilisateurs du compte
          const compte = await Compte.query({ client: trx })
            .where('id', abonnement.compteId)
            .firstOrFail()

          if (compte.nbUtilisateurs >= 11) {
            throw new Error(`Le réabonnement n'est pas possible pour le compte ${compte.emailCompte}. Veuillez vous rendre sur le site pour prendre un autre abonnement.`)
          }

          let dateDebut: DateTime
          let dateFin: DateTime

          // Si la date de fin est dans le futur
          if (abonnement.dateFin > now) {
            dateDebut = abonnement.dateFin
            dateFin = dateDebut.plus({ days: (payload.duree || 1) * 30 })
          } else {
            // Si la date de fin est passée
            dateDebut = now
            dateFin = now.plus({ days: (payload.duree || 1) * 30 })
          }

          // Créer l'entrée dans l'historique
          await HistoriqueAbonnement.create({
            utilisateurId: abonnement.utilisateurId,
            compteId: abonnement.compteId,
            profilId: abonnement.profilId,
            typeCompteId: abonnement.typeCompteId,
            dateDebut: abonnement.dateDebut,
            dateFin: abonnement.dateFin,
            inactif: abonnement.inactif,
            fin: abonnement.fin
          }, { client: trx })

          // Mettre à jour l'abonnement
          abonnement.merge({
            typeCompteId: payload.typeCompteId,
            dateDebut,
            dateFin,
            inactif: false,
            fin: false
          })
          await abonnement.save()

          // Incrémenter le nombre d'utilisateurs si la date de fin est passée
          if (abonnement.dateFin < now) {
            compte.merge({ nbUtilisateurs: compte.nbUtilisateurs + 1 })
            await compte.save()
          }

          abonnementsMisAJour.push(abonnement)
        }

        // Créer la notification
        let notificationMessage = `Félicitations ${abonnementInitial.utilisateur.nom}, votre réabonnement a été effectué avec succès le ${DateTime.now().toFormat('dd/MM/yyyy à HH:mm')}.\n\n`
        
        if (isPack) {
          notificationMessage += 'Vos comptes :\n'
          abonnementsMisAJour.forEach((abonnement) => {
            notificationMessage += `\n${abonnement.compte.plateforme}:\n`
            notificationMessage += `Compte: ${abonnement.compte.emailCompte}\n`
            notificationMessage += `Mot de passe: ${abonnement.compte.motDePasse}\n`
            notificationMessage += `Profil: ${abonnement.profil.nomProfil}\n`
            notificationMessage += `PIN: ${abonnement.profil.pin}\n`
            notificationMessage += `Date de début: ${abonnement.dateDebut.toFormat('dd/MM/yyyy')}\n`
            notificationMessage += `Date de fin: ${abonnement.dateFin.toFormat('dd/MM/yyyy')}\n`
          })
        } else {
          notificationMessage += `Compte: ${abonnementInitial.compte.emailCompte}\n`
          notificationMessage += `Mot de passe: ${abonnementInitial.compte.motDePasse}\n`
          notificationMessage += `Profil: ${abonnementInitial.profil.nomProfil}\n`
          notificationMessage += `PIN: ${abonnementInitial.profil.pin}\n`
          notificationMessage += `Date de début: ${abonnementInitial.dateDebut.toFormat('dd/MM/yyyy')}\n`
          notificationMessage += `Date de fin: ${abonnementInitial.dateFin.toFormat('dd/MM/yyyy')}\n`
        }

        const notification = await Notification.create({
          message: notificationMessage,
          utilisateurId: abonnementInitial.utilisateur.id
        }, { client: trx })

        return { 
          abonnements: abonnementsMisAJour, 
          utilisateur: abonnementInitial.utilisateur,
          notification,
          isPack
        }
      })

      const abonnements = result.abonnements
      const utilisateur = result.utilisateur
      const notification = result.notification
      const isPack = result.isPack

      // Génération du PDF
      let pdfPath = null
      try {
        if (isPack) {
          pdfPath = await generatePdf(
            utilisateur,
            abonnements.map(a => a.compte),
            abonnements.map(a => a.profil),
            abonnements
          )
        } else {
          pdfPath = await generatePdf(
            utilisateur,
            abonnements[0].compte,
            abonnements[0].profil,
            abonnements[0]
          )
        }
      } catch (error) {
        console.error('Erreur lors de la génération du PDF:', error)
      }

      // Envoi d'email
      try {
        if (isPack) {
          const contenuPack = abonnements.map((abonnement) => `
            <div style="margin-bottom: 20px; padding: 10px; border: 1px solid #ddd;">
              <h3>${abonnement.compte.plateforme}</h3>
              <p>Compte: ${abonnement.compte.emailCompte}</p>
              <p>Profil: ${abonnement.profil.nomProfil}</p>
              <p>PIN: ${abonnement.profil.pin}</p>
              <p>Date de fin: ${abonnement.dateFin.toFormat('dd/MM/yyyy')}</p>
            </div>
          `).join('')

          await sendEmail(
            utilisateur.email,
            'Réabonnement de votre pack effectué',
            `<p>Bonjour ${utilisateur.nom},</p>
            <p>Votre réabonnement de pack a été effectué avec succès.</p>
            ${contenuPack}
            <p>Cordialement,</p>
            <p>Supermarché</p>`
          )
        } else {
          await sendEmail(
            utilisateur.email,
            'Réabonnement effectué',
            `<p>Bonjour ${utilisateur.nom},</p>
            <p>Votre réabonnement a été effectué avec succès.</p>
            <p>Compte: ${abonnements[0].compte.emailCompte}</p>
            <p>Profil: ${abonnements[0].profil.nomProfil}</p>
            <p>PIN: ${abonnements[0].profil.pin}</p>
            <p>Date de fin: ${abonnements[0].dateFin.toFormat('dd/MM/yyyy')}</p>
            <p>Cordialement,</p>
            <p>Supermarché</p>`
          )
        }
      } catch (error) {
        console.error('Erreur lors de l\'envoi de l\'email:', error)
      }

      // Envoi WhatsApp
      try {
        if (isPack) {
          for (const abonnement of abonnements) {
            await sendSms(utilisateur.telephone, abonnement.compte, abonnement.profil)
          }
        } else {
          await sendSms(utilisateur.telephone, abonnements[0].compte, abonnements[0].profil)
        }
      } catch (error) {
        console.error('Erreur lors de l\'envoi du WhatsApp:', error)
      }

      // Réponse au frontend
      const response_data: any = {
        message: isPack ? 'Réabonnement de pack effectué avec succès' : 'Réabonnement effectué avec succès',
        data: {
          abonnements: abonnements.map(abonnement => ({
            id: abonnement.id,
            dateDebut: abonnement.dateDebut,
            dateFin: abonnement.dateFin
          })),
          comptes: abonnements.map(abonnement => ({
            email: abonnement.compte.emailCompte,
            motDePasse: abonnement.compte.motDePasse
          })),
          profils: abonnements.map(abonnement => ({
            nom: abonnement.profil.nomProfil,
            pin: abonnement.profil.pin
          }))
        },
        warnings: []
      }

      if (pdfPath) {
        response_data.data.pdf = pdfPath
        // Mettre à jour la notification avec le lien du PDF
        await notification.merge({
          message: notification.message + `\n\nVous pouvez télécharger le PDF de vos informations en cliquant ici : ${pdfPath}`
        })
        await notification.save()
      } else {
        response_data.warnings.push('Le PDF n\'a pas pu être généré')
      }

      return response.ok(response_data)
    } catch (error) {
      return response.status(400).send({ 
        error: 'Erreur lors de la relance de l\'abonnement',
        details: error.message
      })
    }
  }
}
