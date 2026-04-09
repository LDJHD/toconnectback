import { BaseModel, column } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'
export default class Utilisateur extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nom: string

  @column()
  declare email: string

  @column()
  declare telephone: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
