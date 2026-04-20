const WHATSAPP_NUMBER = '22967357728'
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000'

interface CommandeInfo {
  numero: string
  utilisateurNom: string
  utilisateurTelephone: string
  montantTotal: number
  montantFinal: number
  reductionPourcentage: number
  reductionMontant: number
  statutClient: string
  pointsSnapshot: number
  reductionUsesRestants: number
  items: Array<{ nomArticle: string; quantite: number; prixUnitaire: number }>
}

interface AbonnementInfo {
  nom: string
  email: string
  telephone: string
  plateforme: string
  duree: number
  montant: number
}

export function generateOrderWhatsAppLink(commande: CommandeInfo): string {
  const message = formatOrderMessage(commande)
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

export function generateCustomerOrderWhatsAppLink(commande: CommandeInfo): string {
  const message = formatCustomerOrderMessage(commande)
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

export function generateSubscriptionWhatsAppLink(abonnement: AbonnementInfo): string {
  const message = formatSubscriptionMessage(abonnement)
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

export function generateOrderViewLink(numero: string): string {
  return `${FRONTEND_URL}/commande/${numero}`
}

function formatOrderMessage(commande: CommandeInfo): string {
  let message = `🛒 *NOUVELLE COMMANDE - TO CONNECT*\n\n`
  message += `📋 *N° Commande:* ${commande.numero}\n`
  message += `👤 *Client:* ${commande.utilisateurNom}\n`
  message += `📱 *Téléphone:* ${commande.utilisateurTelephone}\n\n`
  message += `📦 *Articles commandés:*\n`

  for (const item of commande.items) {
    message += `  • ${item.nomArticle} x${item.quantite} — ${item.prixUnitaire * item.quantite} FCFA\n`
  }

  if (commande.statutClient === 'vip') {
    message += `\n⭐ *Statut client:* VIP\n`
  } else if (commande.reductionPourcentage > 0) {
    message += `\n🎯 *Points:* ${commande.pointsSnapshot}\n`
    message += `🏷️ *Reduction appliquee:* ${commande.reductionPourcentage}%\n`
    message += `💸 *Montant reduction:* ${commande.reductionMontant} FCFA\n`
    message += `🧾 *Total initial:* ${commande.montantTotal} FCFA\n`
    message += `💰 *Total final:* ${commande.montantFinal} FCFA\n`
    message += `🔁 *Usages restants au niveau:* ${commande.reductionUsesRestants}\n\n`
  } else {
    message += `\n💰 *Total:* ${commande.montantTotal} FCFA\n\n`
  }

  message += `🔗 *Voir la commande:* ${generateOrderViewLink(commande.numero)}`

  return message
}

function formatCustomerOrderMessage(commande: CommandeInfo): string {
  let message = `Bonjour, je souhaite passer une commande sur TO CONNECT.\n\n`
  message += `📋 *N° Commande:* ${commande.numero}\n`
  message += `👤 *Nom:* ${commande.utilisateurNom}\n\n`
  message += `📦 *Ma commande:*\n`

  for (const item of commande.items) {
    message += `  • ${item.nomArticle} x${item.quantite} — ${item.prixUnitaire * item.quantite} FCFA\n`
  }

  if (commande.statutClient === 'vip') {
    message += `\n⭐ *Votre statut:* VIP\n`
    message += `💰 *Total:* ${commande.montantTotal} FCFA\n\n`
  } else if (commande.reductionPourcentage > 0) {
    message += `\n🎯 *Vos points:* ${commande.pointsSnapshot}\n`
    message += `🏷️ *Reduction appliquee:* ${commande.reductionPourcentage}%\n`
    message += `🧾 *Total initial:* ${commande.montantTotal} FCFA\n`
    message += `💸 *Reduction:* -${commande.reductionMontant} FCFA\n`
    message += `💰 *Total a payer:* ${commande.montantFinal} FCFA\n`
    message += `🔁 *Usages restants:* ${commande.reductionUsesRestants}\n\n`
  } else {
    message += `\n💰 *Total:* ${commande.montantTotal} FCFA\n\n`
  }

  message += `🔗 *Lien commande:* ${generateOrderViewLink(commande.numero)}`

  return message
}

function formatSubscriptionMessage(abonnement: AbonnementInfo): string {
  let message = `📺 *NOUVEL ABONNEMENT - TO CONNECT*\n\n`
  message += `👤 *Client:* ${abonnement.nom}\n`
  message += `📧 *Email:* ${abonnement.email}\n`
  message += `📱 *Téléphone:* ${abonnement.telephone}\n\n`
  message += `🎬 *Plateforme:* ${abonnement.plateforme}\n`
  message += `⏱️ *Durée:* ${abonnement.duree} mois\n`
  message += `💰 *Montant:* ${abonnement.montant} FCFA\n`

  return message
}
