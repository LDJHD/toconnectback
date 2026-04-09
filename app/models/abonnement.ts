import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations' // ✅ Import correct
import { DateTime } from 'luxon'
import Compte from '#models/compte'
import Utilisateur from '#models/utilisateur'
import TypeCompte from '#models/type_compte'
import Profil from '#models/profil'

export default class Abonnement extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare utilisateurId: number

  @column()
  declare compteId: number

  @column()
  declare typeCompteId: number

  @column()
  declare profilId: number

  @column.dateTime()
  declare dateDebut: DateTime

  @column.dateTime()
  declare dateFin: DateTime

  @column()
  declare inactif: boolean

  
  @column()
  declare fin: boolean

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Compte)
  declare compte: BelongsTo<typeof Compte> // ✅ Correct

  @belongsTo(() => Utilisateur)
  declare utilisateur: BelongsTo<typeof Utilisateur> // ✅ Correct

  @belongsTo(() => TypeCompte)
  declare typecompte: BelongsTo<typeof TypeCompte> // ✅ Correct

  @belongsTo(() => Profil)
  declare profil: BelongsTo<typeof Profil>
}
