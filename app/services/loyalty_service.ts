import Utilisateur from '#models/utilisateur'
import UserDiscountUsage from '#models/user_discount_usage'

const MAX_USES_PER_LEVEL = 5

export async function getLoyaltySummary(utilisateur: Utilisateur) {
  const points = Number(utilisateur.points || 0)
  const integerPoints = Math.floor(points)
  const statut = utilisateur.statut || 'normal'

  if (statut === 'vip') {
    return {
      points,
      integerPoints,
      statut,
      reductionPourcentage: 0,
      usageCount: 0,
      remainingUses: 0,
      canApplyReduction: false,
      vip: true,
    }
  }

  const reductionPourcentage = integerPoints >= 2 ? integerPoints : 0
  if (reductionPourcentage === 0) {
    return {
      points,
      integerPoints,
      statut,
      reductionPourcentage: 0,
      usageCount: 0,
      remainingUses: MAX_USES_PER_LEVEL,
      canApplyReduction: false,
      vip: false,
    }
  }

  const usage = await UserDiscountUsage.query()
    .where('utilisateurId', utilisateur.id)
    .where('percentageLevel', reductionPourcentage)
    .first()

  const usageCount = usage?.usageCount || 0
  const remainingUses = Math.max(0, MAX_USES_PER_LEVEL - usageCount)

  return {
    points,
    integerPoints,
    statut,
    reductionPourcentage,
    usageCount,
    remainingUses,
    canApplyReduction: remainingUses > 0,
    vip: false,
  }
}

export async function consumeReductionUsage(utilisateur: Utilisateur, percentageLevel: number) {
  const usage = await UserDiscountUsage.firstOrCreate(
    { utilisateurId: utilisateur.id, percentageLevel },
    { usageCount: 0 }
  )

  usage.usageCount += 1
  await usage.save()

  const remainingUses = Math.max(0, MAX_USES_PER_LEVEL - usage.usageCount)

  if (percentageLevel >= 15 && usage.usageCount >= MAX_USES_PER_LEVEL && utilisateur.statut !== 'vip') {
    utilisateur.statut = 'vip'
    await utilisateur.save()
  }

  return { usageCount: usage.usageCount, remainingUses }
}
