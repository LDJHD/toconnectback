import cron from 'node-cron'
import { checkExpiredAbonnements } from '#crons/abonnement_cron'

// Exécuter la vérification des abonnements expirés toutes les minutes
cron.schedule('* * * * *', async () => {
  console.log('Vérification des abonnements expirés...')
  await checkExpiredAbonnements()
})

console.log('Cron Job activé pour surveiller les abonnements expirés.')
