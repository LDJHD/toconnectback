import { BaseModel, column, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'
import Utilisateur from '#models/utilisateur'
import PanierItem from '#models/panier_item'

export default class Panier extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare sessionId: string

  @column()
  declare utilisateurId: number | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Utilisateur)
  declare utilisateur: BelongsTo<typeof Utilisateur>

  @hasMany(() => PanierItem)
  declare items: HasMany<typeof PanierItem>
}
