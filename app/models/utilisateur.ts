import { BaseModel, column } from '@adonisjs/lucid/orm'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import { DateTime } from 'luxon'
export default class Utilisateur extends BaseModel {
  static accessTokens = DbAccessTokensProvider.forModel(Utilisateur)

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nom: string

  @column()
  declare email: string

  @column()
  declare telephone: string

  @column()
  declare points: number

  @column()
  declare statut: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
