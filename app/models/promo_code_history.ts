import { BaseModel, column } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'

export default class PromoCodeHistory extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare promoCodeId: number | null

  @column()
  declare code: string

  @column()
  declare action: string

  @column()
  declare adminId: number | null

  @column()
  declare utilisateurId: number | null

  @column()
  declare pointsBefore: number | null

  @column()
  declare pointsAdded: number | null

  @column()
  declare pointsAfter: number | null

  @column()
  declare meta: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
