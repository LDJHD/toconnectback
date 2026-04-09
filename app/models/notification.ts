import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations' // ✅ Import correct
import Utilisateur from './utilisateur.js'
import Abonnement from './abonnement.js'
import Admin from './admin.js'

export default class Notification extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare message: string

  @column()
  declare lue: boolean

  @column()
  declare tous: boolean

  @column()
  declare adminId: number | null

  @column()
  declare utilisateurId: number | null

  @column()
  declare abonnementId: number | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Utilisateur)
  declare utilisateur: BelongsTo<typeof Utilisateur> // ✅ Correct

  @belongsTo(() => Abonnement)
  declare abonnement: BelongsTo<typeof Abonnement> // ✅ Correct

  @belongsTo(() => Admin)
  declare admin: BelongsTo<typeof Admin>
}
