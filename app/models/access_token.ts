import { BaseModel, column,  belongsTo } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'
import Utilisateur from '#models/utilisateur'
import type { BelongsTo } from '@adonisjs/lucid/types/relations' // ✅ Import correct

export default class AccessToken extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare utilisateur_id: number

  @column()
  declare admin_id: number

  @column()
  declare token: string

  @column()
  declare type: string

  @column.dateTime()
  declare expires_at: DateTime | null

  @column.dateTime({ autoCreate: true })
  declare created_at: DateTime

  @column.dateTime({ autoUpdate: true })
  declare updated_at: DateTime

  @belongsTo(() => Utilisateur)
  declare utilisateur: BelongsTo<typeof Utilisateur> // ✅ Correct
}
