import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations' // ✅ Import correct
import { DateTime } from 'luxon'
import Compte from '#models/compte'

export default class Profil extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nomProfil: string

  @column()
  declare pin: string

  @column()
  declare nbAbonnes: number

  @column()
  declare compteId: number

  @belongsTo(() => Compte)
  declare compte: BelongsTo<typeof Compte>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
