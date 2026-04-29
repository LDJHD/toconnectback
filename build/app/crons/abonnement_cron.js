import { DateTime } from 'luxon';
import Abonnement from '#models/abonnement';
import HistoriqueAbonnement from '#models/historique_abonnement';
import Notification from '#models/notification';
import { sendEmail } from '#services/mail_service';
import { sendSms } from '#services/helpers';
import db from '@adonisjs/lucid/services/db';
import TypeCompte from '#models/type_compte';
async function checkPreventiveNotifications() {
    try {
        const now = DateTime.now();
        const uneSemainePlusTard = now.plus({ weeks: 1 });
        const debutJournee = uneSemainePlusTard.startOf('day');
        const finJournee = uneSemainePlusTard.endOf('day');
        const abonnementsAExpirer = await Abonnement.query()
            .where((query) => {
            query
                .where('dateFin', '>=', debutJournee.toISO())
                .where('dateFin', '<=', finJournee.toISO())
                .where('fin', false);
        })
            .preload('utilisateur')
            .preload('compte')
            .preload('profil');
        console.log(`Nombre d'abonnements à expirer dans une semaine : ${abonnementsAExpirer.length}`);
        for (const abonnement of abonnementsAExpirer) {
            const notificationExistante = await Notification.query()
                .where('abonnementId', abonnement.id)
                .where('message', 'like', '%Votre abonnement%expirera le%')
                .first();
            if (notificationExistante) {
                console.log(`Notification préventive déjà envoyée pour l'abonnement ${abonnement.id}, pas d'envoi de mail`);
                continue;
            }
            await db.transaction(async (trx) => {
                const notificationMessage = `Votre abonnement ${abonnement.compte.plateforme} expirera le ${abonnement.dateFin.toFormat('dd/MM/yyyy')}. Pensez à le renouveler pour éviter toute interruption de service.`;
                await Notification.create({
                    message: notificationMessage,
                    utilisateurId: abonnement.utilisateurId,
                    abonnementId: abonnement.id
                }, { client: trx });
                await sendEmail(abonnement.utilisateur.email, 'Votre abonnement expire bientôt', `<p>Bonjour ${abonnement.utilisateur.nom},</p>
          <p>${notificationMessage}</p>
          <p>Pour renouveler votre abonnement, veuillez vous connecter à votre compte.</p>
          <p>Cordialement,</p>
          <p>Supermarché</p>`);
                console.log(`Notification préventive envoyée pour l'abonnement ${abonnement.id}`);
            });
        }
    }
    catch (error) {
        console.error('Erreur lors de l\'envoi des notifications préventives:', error);
    }
}
export async function checkExpiredAbonnements() {
    try {
        const now = DateTime.now();
        if (!now.isValid) {
            throw new Error('Date invalide');
        }
        const debutJournee = now.startOf('day');
        const finJournee = now.endOf('day');
        console.log(`Date actuelle : ${now.toFormat('dd/MM/yyyy HH:mm:ss')}`);
        console.log(`Début de la journée : ${debutJournee.toFormat('dd/MM/yyyy HH:mm:ss')}`);
        console.log(`Fin de la journée : ${finJournee.toFormat('dd/MM/yyyy HH:mm:ss')}`);
        const abonnementsExpires = await Abonnement.query()
            .where((query) => {
            query
                .where('dateFin', '<=', finJournee.toISO())
                .where('fin', false);
        })
            .preload('utilisateur')
            .preload('compte')
            .preload('profil')
            .preload('typecompte');
        console.log(`Nombre d'abonnements trouvés : ${abonnementsExpires.length}`);
        console.log(`Période de vérification : du ${debutJournee.toFormat('dd/MM/yyyy HH:mm')} au ${finJournee.toFormat('dd/MM/yyyy HH:mm')}`);
        for (const abonnement of abonnementsExpires) {
            console.log(`Traitement de l'abonnement ${abonnement.id} - Date de fin : ${abonnement.dateFin.toFormat('dd/MM/yyyy')}`);
            await db.transaction(async (trx) => {
                const typeCompte = await TypeCompte.findOrFail(abonnement.typeCompteId);
                const nombreEcran = typeCompte.nombreEcran;
                abonnement.merge({ fin: true, inactif: true });
                await abonnement.save();
                if (abonnement.dateDebut.isValid) {
                    await HistoriqueAbonnement.query({ client: trx })
                        .where('utilisateurId', abonnement.utilisateurId)
                        .where('compteId', abonnement.compteId)
                        .where('profilId', abonnement.profilId)
                        .where('dateDebut', abonnement.dateDebut.toFormat('yyyy-MM-dd'))
                        .update({ fin: true, inactif: true });
                }
                const compte = await abonnement.compte;
                compte.merge({ nbUtilisateurs: compte.nbUtilisateurs - nombreEcran });
                await compte.save();
                const profil = await abonnement.profil;
                profil.merge({ nbAbonnes: profil.nbAbonnes - 1 });
                await profil.save();
                const notificationMessage = `Votre abonnement ${abonnement.compte.plateforme} est expiré depuis le ${abonnement.dateFin.toFormat('dd/MM/yyyy')}. Veuillez le renouveler pour continuer à profiter de nos services.`;
                await Notification.create({
                    message: notificationMessage,
                    utilisateurId: abonnement.utilisateurId
                }, { client: trx });
                await sendEmail(abonnement.utilisateur.email, 'Abonnement expiré', `<p>Bonjour ${abonnement.utilisateur.nom},</p>
          <p>${notificationMessage}</p>
          <p>Pour renouveler votre abonnement, veuillez vous connecter à votre compte.</p>
          <p>Cordialement,</p>
          <p>Supermarché</p>`);
                await sendSms(abonnement.utilisateur.telephone, abonnement.compte, abonnement.profil);
                console.log(`Traitement terminé pour l'abonnement ${abonnement.id}`);
            });
        }
        console.log(`${abonnementsExpires.length} abonnements expirés ont été traités.`);
        await checkPreventiveNotifications();
    }
    catch (error) {
        console.error('Erreur lors de la vérification des abonnements expirés:', error);
    }
}
//# sourceMappingURL=abonnement_cron.js.map