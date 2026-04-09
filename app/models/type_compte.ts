import { BaseModel, column } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'
export default class TypeCompte extends BaseModel {
 
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nom: string

  @column()
  declare prix: number

  @column()
  declare nombreEcran: number

  @column()
  declare plateforme: string

  @column()
  declare image: string | null

  @column()
  declare description: string | null

  @column()
  declare composition: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
