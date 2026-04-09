import { BaseModel, column } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'
export default class Verification extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare email: string

  @column()
  declare code: string

  @column()
  declare utilise: boolean

  @column.dateTime()
  declare expireA: DateTime

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
