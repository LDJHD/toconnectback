import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Utilisateur from '#models/utilisateur'
import Compte from '#models/compte'
import Profil from '#models/profil'
import TypeCompte from '#models/type_compte'

export default class HistoriqueAbonnement extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare utilisateurId: number

  @column()
  declare compteId: number

  @column()
  declare profilId: number

  @column()
  declare typeCompteId: number

  @column.dateTime()
  declare dateDebut: DateTime

  @column.dateTime()
  declare dateFin: DateTime

  @column()
  declare inactif: boolean

  @column()
  declare fin: boolean

  @column()
  declare notificationPreventiveEnvoyee: boolean

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Utilisateur)
  declare utilisateur: BelongsTo<typeof Utilisateur>

  @belongsTo(() => Compte)
  declare compte: BelongsTo<typeof Compte>

  @belongsTo(() => Profil)
  declare profil: BelongsTo<typeof Profil>

  @belongsTo(() => TypeCompte)
  declare typeCompte: BelongsTo<typeof TypeCompte>
}